const postServices = require('./postService');
const notiServices = require('../notification/notiServices');
const {validateObjectId} = require('../../services/validation/validationPost');

//GET
module.exports.getPost = async(req, res, next) =>{
    try {
        const posts = await postServices.getPost(req.query);
        res.status(200).json({data: posts});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.countPost = async(req, res, next) =>{
    try {
        const posts = await postServices.getPost(req.query);
        res.status(200).json({count: posts.length});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.confirmPost = async(req, res, next) =>{
    try {
        const {post_id} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.confirmPost(post_id);
            if(post==null){
                res.status(400).json({message: "Parameter incorrect"});
            }else{
                const title="Duyệt bài đăng";
                const content = "Bài đăng của bạn đã được duyệt";
                const image="", link="", receivers = [];
                const user = {user_id: post.user_id};
                receivers.push(user);
                const noti = await notiServices.createNotification(title, content, image, link, receivers);
                res.status(200).json({data: post});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.rejectPost = async(req, res, next) =>{
    try {
        const {post_id, reason} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.rejectPost(post_id);
            if(post==null){
                res.status(400).json({message: "Parameter incorrect"});
            }else{
                const title="Bài đăng không được duyệt";
                const content = reason;
                const image="", link="", receivers = [];
                const user = {user_id: post.user_id};
                receivers.push(user);
                const noti = await notiServices.createNotification(title, content, image, link, receivers);
                res.status(200).json({data: post});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changeIsRead = async (req, res, next) =>{
    try {
        const {post_id} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.changeIsRead(post_id);
            if(post==null){
                res.status(400).json({message: "Post id incorrect!"});
            }else{
                res.status(200).json({data: post});
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//DELETE
module.exports.deletePost = async (req, res, next) =>{
    try {
        const {post_id} = req.body;
        const valid = await validateObjectId(req.body);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const post = await postServices.deletePost(post_id);
            if(post==null){
                res.status(400).json({message: "Parameter incorrect"});
            }else{
                res.status(200).json();
            }
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}