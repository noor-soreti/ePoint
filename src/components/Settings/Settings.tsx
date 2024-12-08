import { useAuthenticator } from "@aws-amplify/ui-react"


export const Settings = () => {
    const { signOut } = useAuthenticator()
    return(
        <div>SETTINGS</div>
    )
}