const { cloudinary } = require('../../services/cloudinary/cloudinary');

module.exports.uploadImage = async (req, res, next) =>{
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'datn-qlcc',
        });
        console.log(uploadResponse);
        const public_id = uploadResponse.public_id;
        const url = uploadResponse.url;
        res.json({ data: public_id});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json({error});
    }
}
module.exports.deleteImage = async (req, res, next) =>{
    try {
        const {public_id} = req.body;
        const deleteResponse = await cloudinary.uploader.destroy(public_id);
        console.log(deleteResponse);
        if(deleteResponse.result==="ok"){
            console.log("vô if");
            res.status(202).json({public_id});
        }else{
            console.log("Vô else");
            res.status(204).json({message: "Not found"});
        }
    } catch (error) {
        console.log("errors: ", error);
        res.status(500).json({error});
    }
}