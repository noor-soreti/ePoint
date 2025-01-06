import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Schema } from "../../../amplify/data/resource";
import { Box, Typography } from '@mui/material';

const client = generateClient<Schema>();

export default function Cards() {
    const { cardId } = useParams()
    const [cardInfo, setCardInfo] = useState<Schema["Card"]["type"] | null>(null);

    useEffect(() => {
        const getCardInfo = async () => {
            if (typeof cardId === "string") {
                try {
                    const response = await client.models.Card.get({ id: cardId });
    
                    // Extract the `data` field from the response
                    if (response?.data) {
                        setCardInfo(response.data as Schema["Card"]["type"]); // Cast if necessary
                    } else {
                        console.error("No data found in the response");
                        setCardInfo(null); // Set to null if no data is present
                    }
                } catch (error) {
                    console.error("Error fetching card info:", error);
                    setCardInfo(null); // Handle errors by clearing state
                }
            }
        };
    
        getCardInfo();
    }, []);    

    console.log(cardInfo);
    
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h3" sx={{ mb: 2 }}>
                Your {cardInfo?.title} Points
            </Typography>

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Current Tier
                </Typography>
                
                <Typography>
                    {cardInfo?.tier}
                </Typography>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Total Points
                </Typography>
                
                <Typography>
                    {cardInfo?.points}
                </Typography>
            </Box>

            
            

        </Box>
    )
}