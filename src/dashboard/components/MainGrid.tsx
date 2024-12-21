import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Schema } from '../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import AddIcon from '@mui/icons-material/Add';

const data: StatCardProps[] = [
  {
    title: 'Nearest Rewards',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Average Monthly Points',
    value: '325',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
];

const client = generateClient<Schema>();

export default function MainGrid() {
  const [business, setBusiness] = useState<Array<Schema["Business"]["type"]>>([]);
  const [ text , setText ] = useState("")
  const [ openModal, setOpenModal ] = useState(false);  

  useEffect(() => {
    const businessService = client.models.Business.observeQuery().subscribe({
      next: (data) => {        
        setBusiness([...data.items])},
    });
    return () => businessService.unsubscribe()
  }, [business]);

  const handleSearch = () => {
    console.log('search');    
  }

  const createCard = (name: string) => {
    /* 
    1. check if current user has card associated w/ business
      1.1. if user has card, show toast with message "Already have a points card with \business name\"
    2. create new card
    3. navigate to page displaying new card info
    */
    // console.log(name);
    setText("")
  }

  // console.log(business)

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(prev=>!prev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Look for a Business
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <TextField sx={{width: '100%'}} placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
          </Box>
          {
            business.length == 0 
            ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>No Businesses To Display</div>
            :
            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0}}>
              {business.map((b) => (
                <ListItem key={b.id} sx={{width: '100%'}} >
                  <ListItemButton onClick={() => createCard(b.id)}>
                  <ListItemText primary={b.businessName} />
                    <ListItemIcon> <AddIcon/> </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          }
        </Box>

      </Modal>
      {/* cards */}
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Button onClick={() => setOpenModal(prev=>!prev)} variant="contained" color="success">
        <Typography color='white'>New Card</Typography>
      </Button>
      </Box>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}

      </Grid>
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid> */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
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