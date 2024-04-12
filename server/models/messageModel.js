const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema(
    {
    
        message:{
            type : String , 
            required : true,
        },
        users:Array,
        sender:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"users",
            require : true,

        },
    },
    {
        timestamps:true,
    }
);

const Messasges = mongoose.model('Messages',messageSchema);


module.exports = Messasges;