import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
const UserDashboard = () => {
  return (
    <div>
      <List sx={{bgcolor:'black',pb:37}}>
        {["Starting point", "Machine", "Track", "Live Support","Job Boards","Academy"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
            sx={{
              '&:hover': {
                backgroundColor: '#4B8673', // Background color on hover
              },
            }}
              >
                <ListItemIcon sx={{color:'white'}}>
                  {(() => {
                    switch (index) {
                      case 0:
                        return <MenuBookIcon />;
                      case 1:
                        return <PrecisionManufacturingIcon />;
                      case 2:
                        return <TimelineIcon />;
                      case 3:
                        return <SupportAgentIcon />;
                      case 4:
                        return <WorkIcon/>;  
                      case 5:
                        return <SchoolIcon/>;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} sx={{color:'white'}} />
              </ListItemButton>
            </ListItem>
          )
        )}
        
      </List>
    </div>
  );
};

export default UserDashboard;
