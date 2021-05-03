const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: 
    {
        type: String,
        required: [true, 'name is required']
    },
    author: 
    {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    url: 
    {
        type: String,
        required: [true, 'url is required']
    },
    like: 
    {
        type: Number
    }
})

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
})

module.exports = mongoose.model('blog', blogSchema);