import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import type { UserRole } from "@prisma/client"
import { pathName } from "@/router/router"
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation"
import { getAccountByUserId } from "./data/account"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface User {
        role?: UserRole;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        role?: UserRole;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
    }
}

export const { 
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: pathName.login.path,
        error: pathName.error.path,
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            if (!existingUser?.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                console.log({twoFactorConfirmation});
                
                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            }

            return true
        },
        async session ({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                    session.user.role = token.role
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }
            
            return session
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!existingAccount
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token
        }
    },
    // @ts-ignore
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})