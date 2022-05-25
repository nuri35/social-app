import React,{useState,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddPostForm from "./AddPostForm"
import Menu from '@mui/material/Menu';
import Header from "./Header/Header.js";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styles from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import {LogoutOutlined} from '@ant-design/icons';
import { AuthContext } from "./Context";
import { Link } from "react-router-dom";
import Buttonx from "./CustomButtons/Button";

const useStyles = makeStyles(styles);

function SectionNavbars() {

  const {user} = useContext(AuthContext)
  const classes = useStyles();
  const [ setAnchorElNav] = React.useState(null);
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


  
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(true);
  
  };

  const handleClose = () => {
   
    setOpen(false);
  };
  

  const logoutHandle = async()=>{

    window.open("http://localhost:5000/auth/logout", "_self");
 

}


  const settings = [{ad:"Home",url:"/"},{ad:"Profile",url:""}, {ad:"Stats",url:""},{ad:"Stories",url:""},{ad:"Blogs",url:""}];
  
  return (
    
    <>
      <div id="navbar" className={classes.navbar }>
      
        
            <Header
            brand="BLOGİUM"

            
           
            rightLinks={
              <List >
                  
                <Box sx={{ flexGrow: 0 }}>
                <ListItem className={classes.listItem}>
               
                <Buttonx  size="sm" color="success" onClick={handleOpen}>
                   <span>Save and Publish </span>         
                </Buttonx>
                </ListItem>
               
                <ListItem className={classes.listItem}>
        <Tooltip title="More" >
            <IconButton onClick={handleOpenUserMenu}  sx={{ p: 1 }}>
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
                    <Buttonx
            color="transparent"
            component={Link}
            to={setting.url}
            className={classes.navLink}
          >
           { setting.ad}
          </Buttonx>
                
                </MenuItem>
              ))}
              
              <MenuItem onClick={logoutHandle} >
             
         
         <Typography textAlign="center" > <LogoutOutlined /> Logout</Typography>
           
                </MenuItem>
             
            </Menu>
         
                </ListItem>
                </Box> 

              </List>
            }
          /> 
        
      
                 
    
                 
                 
      </div>
          <AddPostForm  open={open} handleClose={handleClose} />
          </>
  );
}

export default  SectionNavbars