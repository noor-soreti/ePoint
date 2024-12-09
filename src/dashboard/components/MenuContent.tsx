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
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';

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

export default function MenuContent() {
  const [ openCardsDropdown, setOpenCardsDropdown ] = useState(false)
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
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
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
