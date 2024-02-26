import { currentUser } from "@/lib/auth"
import { UserInfo } from "../_components/UserInfo"

export default async function ServerPage() {
    const user = await currentUser()

    return (
        // @ts-ignore
        <UserInfo user={user} label="💻 Server component" />
    )
}
