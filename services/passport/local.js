const LocalStrategy = require('passport-local').Strategy;
const authService = require('../../components/auth/authServices');
const bcrypt = require('bcryptjs');

module.exports = new LocalStrategy({ session: false }, async (username, password, callback) => {
  // We use default {username: "catlover", password: "cat", id: 1} to authenticate.
  // You should use database to check for user credentials.
  console.log("vô local"); 
  const user = await authService.getUserByUsername(username);
  const noUser = {message: "null"};
  if(!user){
    console.log("không có user")
    
    callback(null,noUser);
  }else{
    const infoUser = {id:user._id, username: user.username, password: user.password, name: user.name,
      phone: user.phone, email: user.email, role: user.role, avatar: user.avatar, identify_card: user.identify_card,
      native_place: user.native_place, token_device: user.token_device, 
      is_delete: user.is_delete, token_device_web: user.token_device_web}
    bcrypt.compare(password,user.password, (err,isMatch ) =>{
      if (err) throw err;
              if (isMatch) {
                console.log("user:"+user);
                  callback(null, infoUser)
              } else {
                // callback(null, false);
                console.log("sai mk")
                callback(null,noUser);
              }
  });
  }
});
