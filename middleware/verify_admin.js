module.exports=(req,res,next)=>{
    if(!req.session.isAdmin){
        return res.status(403).render('errors/403',{
            page_title:'Forbidden'
        });
      }
      next();
}