import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button } from '@mui/material';

export const Settings = () => {
    const { signOut } = useAuthenticator((context) => [context.user])
    return(
        <div>
            SETTINGS
            <Button onClick={signOut} >Log Out</Button>
        </div>
    )
}