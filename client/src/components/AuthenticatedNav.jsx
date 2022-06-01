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
import { Empty} from 'antd';
import CardActionArea from '@mui/material/CardActionArea';


const useStyles = makeStyles(styles);
const src = `http://localhost:3000/Post/`
function SectionNavbars({notifications}) {

  const {user} = useContext(AuthContext)
  const classes = useStyles();
  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);

 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleOpenNotification = (event) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNoti(null);
  };

  const logoutHandle = async()=>{

      window.open("http://localhost:5000/auth/logout", "_self");
   

  }
  
const displayNotification = ({senderName,type,avatar,commOrPost,postId})=>{
let action;
let postOrComm;

if(type === 1 ){
action = "Liked"
}else if (type === 2){
action = "Commented"
}else if (type === -1){
  action = "Disliked"
}

if(commOrPost){
  postOrComm = "Post"
}else{
  postOrComm = "Comment"
}



return (
 
  <div className='notifaction'>
  <CardActionArea  href={src+postId}>
  
  <MenuItem >
  
  <div className="avNoti">

 
  <Avatar src={avatar}>
            
   </Avatar>
   </div>
  {`${senderName} ${action} your  ${postOrComm}`}
 
</MenuItem>
</CardActionArea>
</div>
);


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
               

                <Tooltip title="Notifaction" >
                <MenuItem >
        <IconButton onClick={handleOpenNotification} size="small" aria-label="show 4 new mails" color="inherit">
       

          <Badge  badgeContent={notifications?.length > 0 ?  `${notifications?.length}` : "0"} color="error">
            <BellOutlined />
          </Badge>
        </IconButton>
      
      </MenuItem>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNoti}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNoti)}
              onClose={handleCloseNotification}
            >
   <div className='notif__headerInfo'>
  <h3>Notifications</h3>
</div>

          {
          notifications?.length >0 ?
       

          notifications.map((n) => displayNotification(n))
          :
          <div>


          <Empty className="notifaction" 
          description={
            <div>
            <span >
             Your notifications are shown here
         
            </span>
            <hr></hr>
            <p>Get notified about the latest blogs. </p>
            <p>Stay tuned to hibernate now</p>
</div>
        
          } 
           image="https://cdn0.iconfinder.com/data/icons/app-pack-1-musket-monoline/32/app-25-bell-512.png"
          imageStyle={{
            height: 100,
          }} />
 </div>
                    }
                   

          
        
            </Menu>
               


   
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