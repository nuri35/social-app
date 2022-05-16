import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import moment from "moment"
import Chip from '@mui/material/Chip';
moment.locale("tr")

function FeaturedPost(props) {
  const { post } = props;



 
  const convertRelativeTime = (date)=>{
    const convertValue =  moment(date).startOf('mini').fromNow()
  
   return convertValue
  }

  const src = `http://localhost:3000/Post/`
  const İmgSrc = `https://source.unsplash.com/random/800x500?`


 
  return (
   
   
    
      <Grid item xs={8} md={10} >
      <Divider />
     <CardActionArea  href={src+post._id} ref={props.inputRef} >
    
       <Card  sx={{display:"flex", margin:2,maxHeight:500 }} >
      
         <CardContent sx={{ flex: 1 }}>
         <CardHeader
   
   avatar={
     post?.authorId?.google ?
    <Avatar src={post?.authorId?.google?.avatar} aria-label="recipe">

   </Avatar>
   :
 
      <Avatar src={post?.authorId?.local?.avatar} aria-label="recipe">

      </Avatar>
   }
  


    title={
      post?.authorId?.google ?

     `${post?.authorId?.google.name}`
      :
      `${post?.authorId?.local.name}  ${post?.authorId?.local.surname}` 
      
      }
     subheader={convertRelativeTime(post.createdAt)}
     />
           <Typography component="h2" variant="h5">
             {post.title}
           </Typography>
          
           <div className='diffx'  >
             {post.Subtitle}
           </div>
          <Chip label={post.tag} onClick/>
         </CardContent>
         <CardMedia
           component="img"
           sx={{ width: 160, display:"flex" }}
           image={İmgSrc + post.tag}
           alt={post.imageLabel}
         />
       </Card>
     </CardActionArea>
    </Grid>
   
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;