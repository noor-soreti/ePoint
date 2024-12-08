import { useAuthenticator } from "@aws-amplify/ui-react"
import Button from '@mui/material/Button';

export const Settings = () => {
    const { signOut } = useAuthenticator()

    return(
        <div>
            
            <Button onClick={signOut} variant="contained" style={{backgroundColor: 'red'}}>Sign Out</Button>
        </div>
    )
}