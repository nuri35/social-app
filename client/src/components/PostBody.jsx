import React,{useEffect,useContext, useState} from "react"
import {useParams} from "react-router-dom"
import {useSelector } from "react-redux";
import Nav from "./Nav"
import Comments from "./Comments"
import LikeDislike from "./LikeDislike"
import {fetchSinglePost} from "../actions/post"
import moment from "moment"
import Chip from '@mui/material/Chip';
import { AuthContext } from "./Context";
import AuthenticatedNav from "./AuthenticatedNav"
import axios from "axios";
import { Empty } from 'antd';
// import {useDispatch} from "react-redux"


function PostBody(){

    const {user,ısAuthenticated} = useContext(AuthContext)
   

    const imgSrc = `https://source.unsplash.com/random/800x500?`

    const params = useParams();


// const dispatch = useDispatch()

 useEffect(() => {
   
    fetchSinglePost(params.id)


}, [params.id])



const currentPost = useSelector(state => state.posts.currentPost)

const [CommentLists,setCommentLists] = useState([])



 const updateComment = (newComment)=>{
  

     setCommentLists(CommentLists.concat(newComment))

    
 }

 const editComment =  (newComment)=>{
  
   let indexValue = null

const newCommentArr = CommentLists.filter((comment,index)=>{
    if( newComment._id === comment._id){
       
        indexValue = index
     return indexValue
    }else{
        return newComment._id !== comment._id
    }

})

    newCommentArr.splice(indexValue,0,newComment)

setCommentLists(newCommentArr)

   
}



const deleteComment = (newComment)=>{
  

  
const deletedArr = CommentLists.filter((comment)=>{
   
    
       return newComment !== comment._id


})


setCommentLists(deletedArr)

   
}



 
useEffect(() => {

    
const allComments = async ()=>{
    const postVariable = {
        postId : params.id
}
try{

    const  commentsBypostId =  await axios.post("http://localhost:5000/comment/getComments",postVariable)

    if(commentsBypostId.data.success){
      setCommentLists(commentsBypostId.data.postIdbyComments)
    
    }


}catch(err){
    console.log(err)
}

}

allComments()
    
    }, [params.id,CommentLists])



    return (
        <>

          {ısAuthenticated ?
            <AuthenticatedNav >

</AuthenticatedNav>
           
            : 
            <Nav  >
           
            </Nav> }

            {
                currentPost ? 

                <div className="postBody">
            
         
             
                <div className="postBody_container">
                    
        <h1>{currentPost?.title}</h1>
        <p className="diff">
      {currentPost?.Subtitle}
        </p>
       
    
    
      
    <span style={{padding:"6px",color:"#1A8917"}}>{
    
    currentPost?.authorId?.google ?
    `${currentPost?.authorId?.google.name}`
    
    :
    `${ currentPost?.authorId?.local.name} ${currentPost?.authorId?.local.surname}`
   
    
    }</span>
    <span style={{padding:"6px",  color:"#757575"}} >{moment(currentPost?.time).fromNow()}</span>
    
       <img src={imgSrc+currentPost?.tag}  alt="about"/>
    
     <div dangerouslySetInnerHTML={{__html:currentPost?.content}} />
     
    
    <div className="chips">
    <Chip label={currentPost?.tag} onClick/>
    </div>
            <div className="postBody_icons">
          
                <div className="postBody_container">
               
               {
                   ısAuthenticated ?
                   <LikeDislike post postId={params.id} userId={user.id}  />
                   :
                   <></>
               }
                  
    
        
                </div>
              
           
            </div>
         
            <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
           
            <Comments CommentLists={CommentLists} post={currentPost?._id} refreshFunction={updateComment} editFunction={editComment} deleteFunction={deleteComment} />
       </div>
          
        </div>
      
            </div>
           

                :

               <Empty description="No Comment"  />
            }
      
        </>
    )
}

export default PostBody


