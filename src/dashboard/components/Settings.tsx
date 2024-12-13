import { Button } from '@mui/material';
import { signOut } from 'aws-amplify/auth';

const handleLogOut = async () => {
    await signOut();

}

export const Settings = () => {
    return(
        <div>
            SETTINGS
            <Button onClick={handleLogOut} >Log Out</Button>
        </div>
    )
}