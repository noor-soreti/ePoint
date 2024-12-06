import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CableIcon from '@mui/icons-material/Cable';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AddCardIcon from '@mui/icons-material/AddCard'

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: 'Rewards Cards', icon: <CardMembershipIcon /> },
  // { text: 'New Card', icon: <AddCardIcon /> },
  { text: 'Insights', icon: <AnalyticsIcon /> },
];

const cardListItems = [
  {text: 'Coffee Haven', icon: <CoffeeIcon/>},
  {text: 'Book Nook', icon: <MenuBookIcon/>},
  {text: 'Tech Vault', icon: <CableIcon/>},
  {text: 'Gamer\'s Edge', icon: <VideogameAssetIcon/>}
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [ openDropDown, setOpenDropDown ] = React.useState(false);

  const handleOpenDropDown = () => {
    setOpenDropDown(prev=>!prev);
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>

            {
              item.text == 'Rewards Cards' ?
              <>
              <ListItemButton onClick={handleOpenDropDown} selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {
                openDropDown ? <ExpandLess/> : <ExpandMore/>
              }
              </ListItemButton>
              <Collapse in={openDropDown} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {cardListItems.map((cardItem) => (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>{cardItem.icon}</ListItemIcon>
                      <ListItemText primary={cardItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              </>
              :
              <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            }
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
