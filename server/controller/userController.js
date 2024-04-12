const users = require('../models/userModel');
const bcrypt = require('bcrypt');



module.exports.setavatar = async(req ,res , next)=>{
  try{
    const {image} = req.body;
    const {id} = req.params;   
    const query = {_id : id};
    const update = {
      $set:
      {
          isAvatarImageSet: true,
          avatarImage: `${image}`,
      }
    }
    if(await users.findOne({_id : id}) === null )
      return res.json({isSet : false , msg : "Couldnot find user please try again"});
      try {
        const user = await users.updateOne(query, update);
        return res.json({ isSet: true, image : image });
      } catch (err) {
        return res.json({ isSet: false, msg: "Could not update Profile Picture, please try again!" });
      }
    }catch(ex){
      next(ex);
    }
}


module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await users.findOne({ username });

        if (usernameCheck) return res.json({ msg: "Username already used", status: false });

        const emailCheck = await users.findOne({ email });
        
        if (emailCheck) return res.json({ msg: "Email already used", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({
        email,
        username,
        password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async(req , res ,next)=>{
    try{
      const { username , password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await users.findOne({username : username});
      if( !user ) return res.json({ msg : "Username Doesnot exists"  , status : false});
      const ispasswordvalid = await bcrypt.compare(password , user.password);
      if(!ispasswordvalid){
          return res.json({msg : "Incorrect Username or Password" , status : false});
      }
      delete user.password;
      return res.json({status : true , user});
    }
    catch(ex){
        next(ex);
    }
};


module.exports.getallusers = async(req ,res , next)=>{
  try {
    const allusers = await users.find({_id: {$ne : req.params.id}}).select([
      "email","username","avatarImage","_id"
    ]);
    return res.json({data : allusers});
  } catch (error) {
      next(error);
  }
};


module.exports.logOut = async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};