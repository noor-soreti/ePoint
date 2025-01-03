import { generateClient } from 'aws-amplify/api';
import { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const client = generateClient<Schema>();

export const BusinessPage = () => {
    const { businessId } = useParams()
    const [ saleItems, setSaleItems ] = useState<Array<Schema["SalesItem"]["type"]>>([]);
    const [ businessName, setBusinessName ] = useState<string | undefined>("")
    
    useEffect(() => {
        const salesItemService = client.models.SalesItem.observeQuery({
            filter: {
                businessId: {eq: businessId}
            }
        }).subscribe({
            next: (data) => {                
                setSaleItems([...data.items])
            }
        });

        const getBusinessName = async () => {
            if (typeof businessId == "string") {
                const bName = await client.models.Business.get({id: businessId})
                setBusinessName(bName.data?.businessName);
            }
        }
        getBusinessName()
        return () => salesItemService.unsubscribe()
    }, [])

    console.log(saleItems)

    return (
        <Box>
            {businessName}
            <List>
                {saleItems.map((items, index) => (
                    <ListItem key={items.id} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => console.log("eekkekeke")} selected={index === 0}>
                            <ListItemText primary={items.name}/>
                            <ListItemIcon>
                            <AddIcon/>
                            </ListItemIcon>
                        </ListItemButton>
                    {/* </Link> */}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}