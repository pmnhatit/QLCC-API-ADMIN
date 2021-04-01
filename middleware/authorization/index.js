const author = (req, res, next) =>{
    if(req.user.role==0){
        next();
    }else{
        res.status(401).json();
    }
}
module.exports = author;