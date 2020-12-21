const Criminal = require('../models/criminal');

const file_handling = require('../utils/file_handling');
const date_convertor = require('../utils/date_convertor');

exports.get_criminals_details = (req, res, next) => {
    Criminal.getAllCriminals().then(([data, others]) => {
        res.render('criminal/criminals_details', {
            page_title: 'Criminals',
            path: '/criminal/criminals_details',
            criminals: data
        })
    })
}

exports.get_criminal_detail_by_id = (req, res, next) => {
    const id = req.params.id;
    Criminal.getCriminalById(id).then(([data, others]) => {
        // console.log(data);
        res.render('criminal/criminal_detail', {
            page_title: 'Criminal detail',
            path: '/criminal/criminal_detail',
            criminal: data[0]
        });
    }).catch(err => {
        console.log(err);
    })
}


exports.get_add_criminal_detail = (req, res, next) => {
    res.render('criminal/add_criminal', {
        page_title: 'Add Criminal',
        path: '/criminal/add_criminal',
        error_msg: '',
        isEditing: false,
    })
}

exports.post_add_criminal_detail = (req, res, next) => {
    console.log(req.body);
    // console.log(req.files);
    const name = req.body.name;
    const photo_filename = req.files[0].filename;
    const height = req.body.height;
    const weight = req.body.weight;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const city = req.body.city;

    const criminal = new Criminal(null, name, photo_filename, height, weight, dob, city, gender);
    criminal.addCriminal().then(result => {
        console.log(result);
        res.redirect('/criminal/criminals_details');
    }).catch(err => {
        console.log(err);
    });


}

exports.get_edit_criminal_by_id = (req, res, next) => {
    const id = req.params.id;
    Criminal.getCriminalById(id).then(([data, others]) => {
        // console.log(data);

        data[0].dob = date_convertor.date_to_YYYY_MM_DD(data[0].dob);
        // console.log(data[0].dob);
        res.render('criminal/add_criminal', {
            page_title: 'Edit criminal detail',
            path: '/criminal/criminal_detail',
            criminal: data[0],
            isEditing: true,
            error_msg: '',
        });
    }).catch(err => {
        console.log(err);
    })
}

exports.post_edit_criminal_by_id = (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    let photo_filename = req.body.old_criminal_photo;
    const height = req.body.height;
    const weight = req.body.weight;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const city = req.body.city;

    if (req.files.length > 0) {
        file_handling.delete_file('public/images/criminals/' + photo_filename);
        photo_filename = req.files[0].filename;
    }
    const updated_criminal = new Criminal(id, name, photo_filename, height, weight, dob, city, gender);
    updated_criminal.updateCriminal().then(result => {
        // console.log(result);
        res.redirect('/criminal/criminals_details');
    }).catch(err => {
        console.log(err);
    });
}


exports.delete_criminal_by_id = (req, res, next) => {
    const id = req.params.id;
    Criminal.getCriminalById(id).then(([data, others]) => {
        // console.log(data);
        photo_filename = data[0].photo_filename;
        file_handling.delete_file('public/images/criminals/' + photo_filename);
        return Criminal.deleteCriminalById(id);
    })
        .then(result => {
            console.log(result);
            res.redirect('/criminal/criminals_details');
        }).catch(err => {
            console.log(err);
            res.redirect('/criminal/criminals_details');
        })
}




exports.search_criminal = (req, res, next) => {
    const search_text = req.body.search_text;
    // console.log(search_text);
    Criminal.searchCriminal(search_text).then(([criminals, others]) => {
        // console.log(crimes);
        res.render('criminal/search_results', {
            page_title: 'Search Results',
            path: '/criminal/search',
            criminals: criminals
        })
    }).catch(err => {
        console.log(err);
    })
}