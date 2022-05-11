const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DislikeSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    postId: { type: Schema.Types.ObjectId, ref: 'blog' },
    commentId: { type: Schema.Types.ObjectId, ref: 'comments' },
    
        
},{
    timestamps : true,
    autoCreate: true,
    collection:"dislike"

});

const dislike = mongoose.model('dislike', DislikeSchema);

module.exports = dislike;