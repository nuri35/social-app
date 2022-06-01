import React , {useState,useEffect,useMemo}from 'react'
import Tooltip from '@mui/material/Tooltip';
import { LikeOutlined,DislikeOutlined,LikeFilled,DislikeFilled } from '@ant-design/icons';
import axios from "axios"
import { useDispatch ,useSelector} from 'react-redux'
import { createNotify }from '../actions/notify'
function LikeDislike(props) {
    const { socket } = useSelector(state => state)
    const {user} = props
    const dispatch = useDispatch()
    const [likes, setLikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);

    const [dislikes, setDislikes] = useState(0);
    const [dislikeAction, setDislikeAction] = useState(null);


    
    let variable = useMemo(() => {
        return {};
      
      
  },[]);

  let commOrPost = useMemo(() => {
    return true;
  
  
},[]);

    

    if(props.post){
        commOrPost = true
         variable = {
           postId:props.postId,
           user:props.userId
        }


    }else{
        commOrPost = false
         variable = {
            commentId:props.commentId,
            user:props.userId
         }


    }

    useEffect(() => {
        
const getAction = async()=>{

    try{
      
   
    
  const result =   await axios.post("http://localhost:5000/action/getLikes",variable)


              if(result.data.success){
                  setLikes(result.data.likes.length)
                 

                  result.data.likes.forEach(like =>{

                      if(like.userId === props.userId){
                          setLikeAction("liked")
                      }

                  })


              }


              const resultDis =   await axios.post("http://localhost:5000/action/getDislikes",variable)

        
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

         
     
            const result =   await axios.post("http://localhost:5000/action/upLike",variable)

      if(result.data.success){

        const msg = {
            id: props.userId,
            text: 'like your post.',
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

      
        const resultUn =   await axios.post("http://localhost:5000/action/unLike",variable)

        if(resultUn.data.success){
            socket.emit('deleteNotification', {
                senderName: props.senderName,
                receiverId:props.receiverId,
                type:1,
               
              
               
            })
                
            setLikes(likes -1)
            setLikeAction(null)

            

        }

    }




    }catch(err){
        console.log(err)
    }

  

}

const onDislike = async (e)=>{
    e.preventDefault()
    try{

        if(dislikeAction !== null){

          
        
            const resultDiss =   await axios.post("http://localhost:5000/action/unDislike",variable)

      if(resultDiss.data.success){
        socket.emit('deleteNotification', {
            senderName: props.senderName,
            receiverId:props.receiverId,
            type:-1,
          
           
        })
setDislikes(dislikes - 1)
setDislikeAction(null)


      }
      
 


    }else{

      
       
        const resultUpDiss =   await axios.post("http://localhost:5000/action/upDislike",variable)

        if(resultUpDiss.data.success){
            socket.emit('sendNotification', {
                senderName: props.senderName,
                receiverId:props.receiverId,
                avatar:props.userİmageSender,
                type:-1,
                commOrPost,
                postId:props.postId
               
            })
            setDislikes(dislikes +1)
            setDislikeAction("disliked")



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