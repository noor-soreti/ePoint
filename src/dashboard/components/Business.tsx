import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const client = generateClient<Schema>();

export const Business = () => {  
    const [business, setBusiness] = useState<Array<Schema["Business"]["type"]>>([]);

    useEffect(() => {
       const businessService = client.models.Business.observeQuery().subscribe({
         next: (data) => {        
           setBusiness([...data.items])},
       });
       return () => businessService.unsubscribe()
     }, [business]);

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }} >
            <List sx={{ width: '100%', gap: 3}}>
              {business.map((b) => (
                <>
                    <ListItem key={b.id} sx={{width: '100%', bgcolor: 'background.paper', borderRadius: 1}} >
                        <ListItemButton href={`/business/${b.id}`} onClick={() => console.log(`this is ${b.id}`)}>
                        <ListItemText primary={b.businessName} />
                            <ListItemIcon> <ArrowForwardIcon/> </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </>
              ))}
          </List>
        </Box>
    )
}