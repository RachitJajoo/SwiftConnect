const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
   username: {
    type : String,
    required : true,
    unique : true,
    min : 3,
    max : 20,
   },
   email: {
    type: String,
    required: true,
    unique : true,
   },
   password: {
    type : String, 
    required : true,
    min : 8,
   },
   isAvatarImageSet: {
    type : Boolean,
    default : false,
   },
   avatarImage:{
    type: String,
    default : "",
   },
});

const users = mongoose.model('users',userSchema);


module.exports = users;