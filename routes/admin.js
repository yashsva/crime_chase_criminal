const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const verifyAuth = require('../middleware/verify_auth');

const verifyAdmin = require('../middleware/verify_admin');

router.get('/dashboard', verifyAuth, verifyAdmin, adminController.get_admin_dashboard);

router.get('/polices_details', verifyAuth, verifyAdmin, adminController.get_polices_details);

router.get('/add_police_personnel', verifyAuth, verifyAdmin, adminController.get_add_police_personnel);

router.post('/add_police_personnel', verifyAuth, verifyAdmin, adminController.post_add_police_personnel);

router.get('/police_personnel_info/:id', verifyAuth, verifyAdmin, adminController.get_police_personnel_info_by_id);

router.get('/edit_police_personnel_info/:id', verifyAuth, verifyAdmin, adminController.get_edit_police_personnel_info);

router.post('/edit_police_personnel_info/:id', verifyAuth, verifyAdmin, adminController.post_edit_police_personnel_info);

router.get('/delete_police_personnel_by_id/:id', verifyAuth, verifyAdmin, adminController.delete_police_personnel_by_id);

router.post('/search', verifyAuth, adminController.search_police);


module.exports = router
