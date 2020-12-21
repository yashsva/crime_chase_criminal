const fs=require('fs');

exports.delete_file=(filePath)=>{
    fs.unlink(filePath,(err)=>{
        if(err){
            throw err;
        }
    })
};