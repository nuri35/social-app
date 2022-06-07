import React , {useState,useContext}from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { useDispatch,useSelector} from 'react-redux'
import FormControl from '@mui/material/FormControl';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SortOutlined from '@mui/icons-material/SortOutlined';
import SingleComment from "./SingleComment"
import ReplyComment from "./ReplyComment"
import { Empty } from 'antd';
import { AuthContext } from "./Context";
import {notification } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { createNotify }from '../actions/notify'
 function Comments(props) {
 
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const {user,ısAuthenticated} = useContext(AuthContext)
  const { socket } = useSelector(state => state)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)} >
       Login
      </Button>
    );
    notification.open({
      message: 'Did you like this blog post?',
      description:
        "Sign in to share your thoughts.And Touch people's lives by commenting on posts",
      btn,
      key,
    });
  
  };

  const [Comment,setComment] = useState("")

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.currentTarget.value)
   
  }



  const sendComment =  async (e)=>{
    e.preventDefault();

   
    if(ısAuthenticated){
     
      setLoading(true)
      try{


        const variable = {
          content:Comment,
          writer:user.id,
          postId:props.post
    }
  

   
  const commentVariable =   await axios.post("/api/comment",variable,{withCredentials: true})

 
        if(commentVariable.data.success){

           // Notify
        const msg = {
          id: commentVariable.data.result[0]._id,
          text: 'has commented on your post.',
          recipients: [props.receiverId],
          url: `/post/${props.post}`
         
      }
        
   
      
        dispatch(createNotify({msg,socket,user}))

          setComment("")
          props.refreshFunction(commentVariable.data.result)
        
        setLoading(false)
         
        }
       

      }catch(err){
        console.log(err.message)
        console.log(err)
      }

  

     
    }else{
      openNotification()
    }

  }


const antIcon = <LoadingOutlined style={{ fontSize: 24,position:"relative",left:"200px" }} spin /> ;


    return (
        
        <div >
       
         <div className="postBody_icons">
         <div className="postBody_container">
         <h4>{props.CommentLists.length} Comments</h4>
         <Tooltip title="SORT BY">
        <IconButton>
        <SortOutlined onClick={handleClick} />
  </IconButton>
       
      
     </Tooltip>
     <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button sx={{ p: 2,fontSize:12 }} style={{display:"block",color:"black"}}>Top comments</Button>
        <Button sx={{ p: 2,fontSize:12  }}  style={{color:"black"}} >Newest first</Button>
      </Popover>
            
            <h4  >SORT BY</h4>

            </div>
       

            </div>
           
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    
    >
     
     <FormControl fullWidth sx={{ m: 1 }} variant="standard" >
    
          <Input
            id="standard-adornment-amount"
            placeholder='Add a public comment'
          onChange={handleChange}
          value={Comment}
          />
          
        </FormControl>

    
        <Button sx={{left:"470px"}} type="submit"  variant="contained" color='primary' disabled={Comment ? false : true}   onClick={sendComment}>Comment</Button>

       { loading ? 
        <Spin indicator={antIcon} />
      : 
<></>
      }
       
      
    </Box>
 
  
      {props.CommentLists && props.CommentLists.map((comment) =>(

        (!comment.responseTo && 
          
          <React.Fragment>
            
          <SingleComment  CommentLists={props.CommentLists} postId={comment.postId}  comment={comment}  receiverId={comment.writer._id}   refreshFunction={props.refreshFunction} editFunction={props.editFunction}  deleteFunction={props.deleteFunction} />

          <ReplyComment   CommentLists={props.CommentLists}   postId={comment.postId}      parentCommentId={comment._id} refreshFunction={props.refreshFunction} editFunction={props.editFunction} deleteFunction={props.deleteFunction} />
          </React.Fragment>
          )
        
      ))}


{!props.CommentLists.length ? 
  <Empty description="No Comment"  />
:
<></>
  

}
      

  

    </div>
        

    );
  }
  
  export default Comments