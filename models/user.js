const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    blogs: [ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
        }
],
    username: 
        {
            type: String,
            unique: true
        }
,
    passwordHash: {
        type: String
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash
    }
})

module.exports = mongoose.model('user', userSchema);