"use client"

import { UserInfo } from "../_components/UserInfo"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function ClientPage() {
    const user = useCurrentUser();

    return (
        // @ts-ignore
        <UserInfo user={user} label="💻 Client component" />
    )
}
