const express = require('express');

const router = express.Router();

const criminalController = require('../controllers/criminal');

const verifyAuth = require('../middleware/verify_auth')

router.get('/criminals_details', verifyAuth, criminalController.get_criminals_details);

router.get('/criminal_detail/:id', verifyAuth, criminalController.get_criminal_detail_by_id);

router.get('/add_criminal', verifyAuth, criminalController.get_add_criminal_detail);

router.post('/add_criminal', verifyAuth, criminalController.post_add_criminal_detail)

router.get('/edit_criminal_detail/:id', verifyAuth, criminalController.get_edit_criminal_by_id);

router.post('/edit_criminal_detail/:id', verifyAuth, criminalController.post_edit_criminal_by_id);

router.get('/delete_criminal/:id', verifyAuth, criminalController.delete_criminal_by_id);

router.post('/search', verifyAuth, criminalController.search_criminal);



module.exports = router;