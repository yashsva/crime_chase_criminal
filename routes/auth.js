const express=require('express');

const router=express.Router();

const authController=require('../controllers/auth');

router.get('/police_login',authController.get_police_login);

router.post('/police_login',authController.post_police_login);

router.get('/admin_login',authController.get_admin_login);

router.post('/admin_login',authController.post_admin_login);

router.get('/logout',authController.logout);




module.exports=router;