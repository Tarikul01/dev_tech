const jwt=require('jsonwebtoken');

// want to like a post
// click the like button =>auth middleware(next)
// like controller 

const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        let decodeData;
        jwt.verify(token,'jwtscreat',(err,data)=>{
            if(err){
                res.status(404).json({"status":"Failed","data":"Unauthorized !"});
            }else{
                req.headers.userId=data.id
                next();
            }
        })

    } catch (err) {
        console.log(err)
        
    }
}

module.exports=auth;