const author = (req, res, next) =>{
    console.log(req.user);
    if(req.user.role==0){
        next();
    }else{
        res.status(401).json();
    }
}
module.exports = author;