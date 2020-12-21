const express=require('express');

const router=express.Router();

const policeController=require('../controllers/police');


router.get('/dashboard',policeController.get_police_dashboard);



module.exports=router;