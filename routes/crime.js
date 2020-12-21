const express = require('express');

const router = express.Router();


const crimeController = require('../controllers/crime');

const verifyAuth = require('../middleware/verify_auth')


router.get('/crimes_details', verifyAuth, crimeController.get_crimes_details);

router.get('/crime_detail/:id', verifyAuth, crimeController.get_crime_detail_by_ID);

router.get('/add_crime', verifyAuth, crimeController.get_add_crime_detail);

router.post('/add_crime', verifyAuth, crimeController.post_add_crime_detail);

router.get('/edit_crime/:id', verifyAuth, crimeController.get_edit_crime_detail);

router.post('/edit_crime/:id', verifyAuth, crimeController.post_edit_crime_detail);

router.get('/delete_crime/:id', verifyAuth, crimeController.delete_crime_by_id);

router.post('/search', verifyAuth, crimeController.search_crime);



module.exports = router;