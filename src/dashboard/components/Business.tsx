import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Collapse from '@mui/material/Collapse';

const client = generateClient<Schema>();

export const Business = () => {
    const [ openCardsDropdown, setOpenCardsDropdown ] = useState(false);
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
                        <ListItemButton onClick={() => setOpenCardsDropdown(prev=>!prev)}>
                        <ListItemText primary={b.businessName} />
                            <ListItemIcon> <ArrowDropDownIcon/> </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={openCardsDropdown} timeout="auto" unmountOnExit sx={{}}>
                        <List component="div" disablePadding>
                            {business?.map((item, index) => (
                            <ListItemText primary={item.id} />
                            ))} 
                        </List>
                    </Collapse>
                </>
              ))}
          </List>
        </Box>
    )
}