const Notifies = require('../models/notifyModel')

const getNotify = async (req,res,next)=>{
 
    try{
    

        const notifies = await Notifies.find({recipients: req.user._id})
        .sort('-createdAt').populate('user', 'avatar username')
        
        return res.json({notifies})

  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}


module.exports = {
    getNotify,
  
}