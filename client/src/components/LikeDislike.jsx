import React , {useState,useEffect,useMemo}from 'react'
// import { useDispatch } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import { LikeOutlined,DislikeOutlined,LikeFilled,DislikeFilled } from '@ant-design/icons';
import axios from "axios"


function LikeDislike(props) {


    const [likes, setLikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);

    const [dislikes, setDislikes] = useState(0);
    const [dislikeAction, setDislikeAction] = useState(null);

   
    
    let variable = useMemo(() => {
        return {};
      
      
  },[]);

    // let variable = {}

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

setDislikes(dislikes - 1)
setDislikeAction(null)


      }
      
 


    }else{
        const resultUpDiss =   await axios.post("http://localhost:5000/action/upDislike",variable)

        if(resultUpDiss.data.success){

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