var multer  = require('multer');
var imageMiddleware= require('../middlewares/image-middleware');
var imageModel= require('../models/image-image');
module.exports={
    imageUploadForm:function(req,res){
        res.render('upload-form');
     },
     displayImage:function(req,res){
        imageModel.displayImage(function(data){
         res.render('display-image',{imagePath:data})
        })
            
         },
     storeImage:function(req,res){
        var upload = multer({
                    storage: imageMiddleware.image.storage(), 
                    allowedImage:imageMiddleware.image.allowedImage 
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              // store image in database
               var imageName = req.file.originalname;
               var inputValues = {
                  image_name: imageName
               }
             // call model
             imageModel.storeImage(inputValues, function(data){
               res.render('upload-form',{alertMsg:data})
             })
              
           }
           
        })
        
     }
}