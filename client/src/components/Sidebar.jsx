import React from 'react'
// import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from "./CustomButtons/Button.js";
import GitHub from '@mui/icons-material/GitHub';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import LinkedIn from '@mui/icons-material/LinkedIn';


function Sidebar(props) {

  const { description,title } = props;
 
    

 
  return (
      
  
<div className="sidebar">
<div className="sidebarItem">

       
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }} >
      <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
    
  
</div>

<div className="sidebarItem">
  <span className="sidebarTitle">FOLLOW US</span>
  <div className="sidebarSocial">
  <Button
                      startIcon={<GitHub />}
                        justIcon
                       
                        target="_blank"
                        color="transparent"
                        href="https://github.com/nuri35"
                      >
                     
                 </Button>

                 <Button
                      startIcon={<Facebook />}
                        justIcon
                       
                        target="_blank"
                        color="transparent"
                        href="https://Facebook.com/"
                      >
                     
                 </Button>

                 <Button
                      startIcon={<LinkedIn />}
                        justIcon
                       
                        target="_blank"
                        color="transparent"
                       
                        href="https://www.linkedin.com/in/nurettin-sen/"
                      >
                     
                 </Button>  

                 <Button
                      startIcon={<Instagram />}
                        justIcon
                        target="_blank"
                        color="transparent"
                        href="https://www.linkedin.com/in/nurettin-sen/"
                      >
                     
                 </Button>  
  </div>
</div>
</div>
  );
}

// Sidebar.propTypes = {
//   archives: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   description: PropTypes.string.isRequired,
//   social: PropTypes.arrayOf(
//     PropTypes.shape({
//       icon: PropTypes.elementType.isRequired,
//       name: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Sidebar;