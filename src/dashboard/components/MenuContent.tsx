import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: "/" },
  { text: 'Cards', icon: <CardGiftcardIcon />, path: "cards"  },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: "analytics"  },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: 'settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: 'about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: 'feedback' },
];

// const cardListItems = [
//   {text: 'Book Nook', }
// ]

const client = generateClient<Schema>();

export default function MenuContent() {
  const [ openCardsDropdown, setOpenCardsDropdown ] = useState(false);
  const [ cards, setCards ] = useState<Array<Schema["Card"]["type"]>>();
  // const business = client.models.Business

  useEffect(() => {
    const cardsService = client.models.Card.observeQuery().subscribe({
      next: (data) => {        
        setCards([...data.items])
      }
    })
    return () => cardsService.unsubscribe()
  },[cards])

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <>
            {
            item.text == 'Cards' ?
            <>
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            {/* <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}> */}
              <ListItemButton onClick={() => setOpenCardsDropdown(prev=>!prev)} selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} >
                  { openCardsDropdown ? <ExpandLess/> : <ExpandMore/> }
                </ListItemText>
              </ListItemButton>
            {/* </Link> */}
            </ListItem>
            <Collapse in={openCardsDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                 {cards?.map((item, index) => (
                  <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <CardGiftcardIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.businessId} />
                </ListItemButton>
                 ))} 
              </List>
            </Collapse>
            </>
            :
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
          }
          </>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  );
}
