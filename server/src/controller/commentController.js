
const Comment = require("./../models/comment")


 
const commentAdd = async (req,res)=>{
    try{ 
    
        const comment = new Comment(req.body);


  const commentNew =   await comment.save()
       
 const result = await Comment.find({"_id":commentNew._id}).populate("writer").populate("postId")
      
    return res.status(200).json({success:true,result})




}catch(err){
console.log(err)


}
    
}


const getComments = async (req,res)=>{

    try{
        
       
        const postIdbyComments = await Comment.find({"postId":req.body.postId}).populate("writer")


      
        res.json({success:true,postIdbyComments})

    }catch(err){
       console.log(err)
    }
}



const editSave = async (req,res)=>{

    try{
        const findWhoComment = await Comment.findOne({$and : [{_id:req.body.postId},{writer:req.user.id}]}).populate("writer")
     
    
        if(findWhoComment){

       const updatedProduct = await Comment.findByIdAndUpdate( findWhoComment._id ,{$set: {content:req.body.content}},{ new: true }).populate("writer").populate("postId")

       res.status(200).json({success:true,updatedProduct})

        }else{
          
        res.status(404).json({message:"You can't delete someone else's comment"})

        }
       
       
       
     
    }catch(err){
       console.log(err)
    }
}




const deleteComment = async (req,res)=>{

    try{
      
    const deleteValue =   await Comment.findByIdAndDelete({_id:req.params.id, $or: [
        {writer: req.user.id},
        {authorId: req.user.id}
    ]}).populate('responseTo','writer').populate('postId','authorId')
  
    //burda kal yarın en usttekı nested yorumu sılınce nested yorumlar database de kalıyor çare bul ayrıca en usttekı yorumu sılınce notify dada usttekı yoruma ılıskın notıfy sılınıyor nestedlardakı notfıy bılıdırımler sılınmıyor bı yarın ogleden sonra düşün en sonda like dıslıke comment o zaten basıt yaparsın


     res.status(200).json({success:true,message:"Comment Deleted",ıtem:deleteValue})
    }catch(err){
       console.log(err)
    }
}

module.exports ={
    commentAdd,
    getComments,
    editSave,
    deleteComment

}