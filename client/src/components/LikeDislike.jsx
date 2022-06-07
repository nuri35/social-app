import React , {useState,useEffect,useMemo,useContext}from 'react'
import Tooltip from '@mui/material/Tooltip';
import { LikeOutlined,DislikeOutlined,LikeFilled,DislikeFilled } from '@ant-design/icons';
import axios from "axios"
import { useDispatch ,useSelector} from 'react-redux'
import { createNotify,removeNotify }from '../actions/notify'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "./Context";
function LikeDislike(props) {
    const { socket } = useSelector(state => state)
    const {user} = useContext(AuthContext)
    const dispatch = useDispatch()
    const [likes, setLikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);

    const [dislikes, setDislikes] = useState(0);
    const [dislikeAction, setDislikeAction] = useState(null);


      
   
    const notify = () => toast('we will not share with creator as notification Sorry.', {
        icon: '👏',
      });

    let variable = useMemo(() => {
        return {};
      
      
  },[]);


    
    
    if(props.post){

     
      
         variable = {
           postId:props.postId,
           user:props.userId
        }


    }else{

    
       
         variable = {
            commentId:props.commentId,
            user:props.userId
         }


    }

    useEffect(() => {
        
const getAction = async()=>{

    try{
      
   
    
  const result =   await axios.post("/api/likes",variable)


              if(result.data.success){
                  setLikes(result.data.likes.length)
                 

                  result.data.likes.forEach(like =>{

                      if(like.userId === props.userId){
                          setLikeAction("liked")
                      }

                  })


              }


              const resultDis =   await axios.post("/api/dislikes",variable)

        
              if(resultDis.data.success){
                  setDislikes(resultDis.data.dislikes.length)
                 

                  resultDis.data.dislikes.forEach(dislike =>{

                      if(dislike.userId === props.userId){
                          setDislikeAction("disliked")
                      }

                  })


              }



      }catch(err){
        console.log(err)
      }
}
        getAction()
}, [props.userId,variable])





const onLike = async (e)=>{
    e.preventDefault()
    try{

        if(likeAction === null){

          
     
            const result =   await axios.post("/api/upLike",variable)

      if(result.data.success){

      let  msg = {
            id: props.userId,
            text: props.post ? 'like your post.' : 'like your comment.',
            recipients: [props.receiverId],
            url: `/post/${props.postId}`,
        
        }
      
      
        dispatch(createNotify({msg,socket,user}))
      
                setLikes(likes +1)
                setLikeAction("liked")

                if(dislikeAction !== null){
                   
                    setDislikeAction(null)
                    setDislikes(dislikes -1)
                }
               


      }
      
 


    }else{

      ///unlike your like post
        const resultUn =   await axios.post("/api/unLike",variable)

        if(resultUn.data.success){
           
          
         let   msg = {
                id: props.userId,
                text: props.post ? 'like your post.' : 'like your comment.',
                recipients: [props.receiverId],
                url: `/post/${props.postId}`,
            
            }
          
            dispatch(removeNotify({msg,socket}))
                
            setLikes(likes -1)
            setLikeAction(null)

            

        }

    }




    }catch(err){
       
    }

  

}

const onDislike = async (e)=>{
    e.preventDefault()
    try{

        if(dislikeAction !== null){

          
        
            const resultDiss =   await axios.post("/api/unDislike",variable)

      if(resultDiss.data.success){
      
        

setDislikes(dislikes - 1)
setDislikeAction(null)


      }
      
 


    }else{

      
       
        const resultUpDiss =   await axios.post("/api/upDislike",variable)

        if(resultUpDiss.data.success){
            
            setDislikes(dislikes +1)
            setDislikeAction("disliked")
            notify()


            if(likeAction !== null){
              
            setLikeAction(null)
            setLikes(likes -1)
            }

            

        }

    }




    }catch(err){
        console.log(err)
    }

}

  
    return (
      
        <React.Fragment>
 <Toaster />
<span>
        <Tooltip title="Like" onClick={onLike}>
       
       { likeAction === "liked" ?
         <LikeFilled   />
     
        :
        <LikeOutlined    />
    
    }
       
       
               
     </Tooltip>
   
<span style={{paddingLeft:"8px",cursor:"auto"}}>{likes}</span>
</span>&nbsp;&nbsp;

       <span>
        <Tooltip title="Dislike" onClick={onDislike}   >

        { dislikeAction === "disliked" ?
       <DislikeFilled />
      
        :
        <DislikeOutlined  />
    
    }
      
 
      
               
     </Tooltip>
     <span style={{paddingLeft:"8px",cursor:"auto"}}>{dislikes}</span>
     </span>


    
        </React.Fragment>
      

    );
  }
  
  export default  LikeDislike