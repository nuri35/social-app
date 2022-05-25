import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from '@mui/material/Menu';
import Header from "./Header/Header.js";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import styles from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import {BellOutlined,LogoutOutlined} from '@ant-design/icons';
import Badge from '@mui/material/Badge';
import { AuthContext } from "./Context";
import Button from "./CustomButtons/Button";

const useStyles = makeStyles(styles);

function SectionNavbars({socket}) {

  const {user} = useContext(AuthContext)
 
  const classes = useStyles();
  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 

 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandle = async()=>{

      window.open("http://localhost:5000/auth/logout", "_self");
   

  }
  


  const settings = [{ad:"Profile",link:""}, {ad:"Stats",link:""},{ad:"Stories",link:""},{ad:"Write a story",link:""},{ad:"Blogs",link:""}];
  
  return (
    
    
      <div id="navbar" className={classes.navbar }>
      
        
            <Header
            brand="BLOGİUM"
            
           
            rightLinks={
              <List className={classes.list}>
                  
                <Box sx={{ flexGrow: 0 }}>
               
                <ListItem className={classes.listItem}>
               
                <MenuItem>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <BellOutlined />
          </Badge>
        </IconButton>
      
      </MenuItem>
   
                </ListItem>
           
                <ListItem className={classes.listItem}>
        
            <Tooltip title="More" >
              <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
              {user.avatar ?
            <Avatar src={user.avatar}>
            
            </Avatar>
            : 
            <Avatar src={user.avatar} ></Avatar>
          
          }
             
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem  onClick={handleCloseNavMenu}>
                   <Button
            color="transparent"
            component={Link}
            to="/New-story"
            className={classes.navLink}
          >
           { setting.ad}
          </Button>
                
                </MenuItem>
              ))}
              
              <MenuItem  onClick={logoutHandle} >
             
              <Button
            color="transparent"
         
            target="_blank"
            className={classes.navLink}
          >
           <LogoutOutlined / > 
           Logout
          </Button>
        
                </MenuItem>
             
            </Menu>
         
                </ListItem>
                </Box> 

              </List>
            }
          /> 
        
   
      </div>

  );
}

export default SectionNavbars