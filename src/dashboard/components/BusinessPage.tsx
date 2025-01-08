import { generateClient } from 'aws-amplify/api';
import { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { fetchUserAttributes } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export const BusinessPage = () => {
    const { businessId } = useParams()
    // const [ saleItems, setSaleItems ] = useState<Array<Schema["SalesItem"]["type"]>>([]);
    const [ saleItems, setSaleItems ] = useState<Array<IPurchaseItem>>([]);
    const [ businessInfo, setBusinessInfo ] = useState<Schema["Business"]["type"] | null>();
    const [ openPurchaseModal, setOpenPurchaseModal ] = useState(false);  
    const [ openRedeemModal, setOpenRedeemModal ] = useState(false);  
    const [ selectedItem, setSelectedItem ] = useState<IPurchaseItem | null>(null)
    const [card, setCard] = useState<Array<Schema["Card"]["type"]>>([]);
    
    useEffect(() => {
        const salesItemService = client.models.SalesItem.observeQuery({
            filter: {
                businessId: {eq: businessId}
            }
        }).subscribe({
            next: (data) => {   
                const items = data.items.map((item: any) => ({
                    businessId: item.businessId,
                    description: item.description ?? '', // Provide default values if necessary
                    id: item.id,
                    name: item.name,
                    price: item.price ?? 0, // Default value in case price is undefined
                  }));
                  console.log("Business Item List:", items)
                // console.log([...data.items])             
                setSaleItems(items)
            }
        });

        const getBusinessName = async () => {
            if (typeof businessId == "string") {
                const business = await (await client.models.Business.get({id: businessId})).data
                setBusinessInfo(business);                
            }
        }

        const getCardInfo = async () => {
            const { email } = await fetchUserAttributes()
            const getUser = await client.models.UserProfile.list({
                filter: {
                    email: {eq: email }
                }
            })
            // const tt = (await [...getUser.data][0].cards()).data.filter((e) => e.businessId ==  )   
        }
        
        getCardInfo()
        getBusinessName()
        return () => salesItemService.unsubscribe()
    }, [])

    const handleOpenPurchaseModal = (item: IPurchaseItem) => {        
        setSelectedItem(item)

        if (selectedItem != null) {
            setOpenPurchaseModal(prev=>!prev)
        }
    }

    const handleClosePurchaseModal = () => {
        setSelectedItem(null)
        setOpenPurchaseModal(prev=>!prev)
    }

    const handleOpenRedeemModal = (item: IPurchaseItem) => {
        setSelectedItem(item)
        if (selectedItem != null) {
            setOpenRedeemModal(prev=>!prev)
        }
    }

    const handleCloseRedeemModal = () => {
        setSelectedItem(null)
        setOpenRedeemModal(prev=>!prev)
    }

    const handlePurchase = async () => {
        // const purchasedItem = await client.queries.purchaseItem({
        //     businessId: selectedItem?.businessId,
        //     description: selectedItem?.description,
        //     itemId: selectedItem?.id,
        //     price: selectedItem?.price,
        //     name: selectedItem?.name
        // })
        // console.log(purchasedItem);
        console.log(selectedItem);
        
    }

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* PURCHASE MODAL */}
            <Modal
                open={openPurchaseModal}
                onClose={handleClosePurchaseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedItem?.name}
                        </Typography>
                        <Typography>
                            {
                                selectedItem?.price != null && 
                                <>
                                ${parseFloat(selectedItem?.price.toString()).toFixed(2)}
                                </>
                            }
                        </Typography>
                        <Typography>
                            Collect X points
                        </Typography>
                    </Box>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 2 }}>
                    <Button onClick={handlePurchase} variant="contained" color="success">
                        Purchase
                    </Button>
                    </Box>
                </Box>
            </Modal>

            {/* REDEEM MODAL */}
            <Modal
            open={openRedeemModal}
            onClose={handleCloseRedeemModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedItem?.name}
                        </Typography>
                        <Typography>
                            {
                                selectedItem?.price != null && 
                                <>
                                ${parseFloat(selectedItem?.price.toString()).toFixed(2)}
                                </>
                            }
                            
                        </Typography>
                        <Typography>
                            Redeem X points
                        </Typography>
                    </Box>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 2 }}>
                    <Button variant="contained" color="warning">
                        Redeem
                    </Button>
                    </Box>
                </Box>
            </Modal>

            <Box>
                <Typography component="h2" variant="h3" sx={{ mb: 2 }}>
                    {businessInfo?.businessName}
                </Typography>
                <Typography>
                    Your {businessInfo?.businessName} points: 20
                </Typography>
            </Box>
            <List>
                {saleItems.map((items, index) => (
                    <ListItem key={items.id} disablePadding sx={{ display: 'flex', backgroundColor: 'background.paper', marginBottom: 5, padding: 2, borderRadius: 1 }}>
                        <Box sx={{width: '100%'}}>
                        <ListItemText primary={items.name}/>
                        <ListItemText primary={'$'+ parseFloat(items.price.toString()).toFixed(2)}/>    
                        </Box>

                        {/* <ListItemButton onClick={() => console.log("eekkekeke")} selected={index === 0}>
                            <ListItemIcon>
                            <AddIcon/>
                            </ListItemIcon>
                        </ListItemButton> */}
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <ListItemButton onClick={() => handleOpenPurchaseModal(items)} sx={{backgroundColor: 'green', color: 'white'}}>Purchase</ListItemButton>
                            <ListItemButton onClick={() => handleOpenRedeemModal(items)} sx={{backgroundColor: 'black', color: 'white'}}>Redeem</ListItemButton>
                        </Box>
                    {/* </Link> */}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  
  };