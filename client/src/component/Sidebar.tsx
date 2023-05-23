import {  List, ListItem, ListItemButton, ListItemText,  } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type SidebarProps = {};

export const Sidebar: React.FC<SidebarProps> = () => {
 
  return (
    <List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  );
};
