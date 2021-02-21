const Police = require('../models/police');
const { validationResult } = require('express-validator/check');

const date_convertor = require('../utils/date_convertor');
const file_handling = require('../utils/file_handling');


exports.get_admin_dashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        page_title: 'Admin Dashboard',
        path: '/admin/dashboard',

    });
}

exports.get_polices_details = (req, res, next) => {

    Police.getAllPoliceDetails()
        .then(([data, fieldData]) => {
            // console.log(data);
            res.render('police/polices_details', {
                page_title: 'Police',
                path: '/admin/polices-details',
                polices: data
            })
        }).catch(err => {
            console.log(err);
        });


}

exports.get_add_police_personnel = (req, res, next) => {
    res.render('police/add_police_personnel', {
        page_title: 'Add Police',
        path: 'admin/add_police_personnel',
        isEditing: false,     //same page for editing & adding police details
        error_msg: '',
    })
}

exports.post_add_police_personnel = (req, res, next) => {
    // console.log(req.body);
    const photo_filename = req.files[0].filename;
    // console.log(photo_filename);

    const errors = validationResult(req);

    const personnel = new Police(null, req.body.name, req.body.email, req.body.department, req.body.phone, req.body.password, req.body.dob, photo_filename, req.body.gender);

    if (!errors.isEmpty()) {
        if (req.files[0]) {
            file_handling.delete_file(req.files[0].path);
        }
        return res.render('police/add_police_personnel', {
            page_title: 'Add Police',
            path: 'admin/add_police_personnel',
            personnel: personnel,
            isEditing: true,
            error_msg: 'Invalid Details',
        });
    }

    personnel.addPolice().then(result => {
        console.log(result);
        res.redirect('/admin/polices_details');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/add_police_personnel')
    })

}

exports.get_police_personnel_info_by_id = (req, res, next) => {
    const id = req.params.id;
    Police.getPersonnelById(id).then(([personnel, others]) => {
        // console.log(personnel);
        personnel[0].dob = date_convertor.date_to_YYYY_MM_DD(personnel[0].dob);
        res.render('police/police_personnel_info', {
            page_title: 'Personnel Info',
            path: '/admin/police_personnel_info',
            personnel: personnel[0]
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/polices_details');
    })
}

exports.get_edit_police_personnel_info = (req, res, next) => {
    const id = req.params.id;
    Police.getPersonnelById(id).then(([personnel, others]) => {
        // console.log(personnel);

        personnel[0].dob = date_convertor.date_to_YYYY_MM_DD(personnel[0].dob);
        res.render('police/add_police_personnel', {
            page_title: 'Edit Info',
            path: '/admin/edit_police_personnel_info',
            personnel: personnel[0],
            isEditing: true,
            error_msg: '',
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/polices_details');
    })
}

exports.post_edit_police_personnel_info = (req, res, next) => {
    const id = req.params.id;
    let photo_filename = req.body.old_police_photo;

    if (req.files.length > 0) {
        file_handling.delete_file('public/images/polices/' + photo_filename);
        photo_filename = req.files[0].filename;
    }

    const personnel = new Police(id, req.body.name, req.body.email, req.body.department, req.body.phone, req.body.password, req.body.dob, photo_filename, req.body.gender);
    personnel.updatePersonnelInfo().then(result => {
        // console.log(result);

        res.redirect('/admin/polices_details');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/polices_details');
    })
}

exports.delete_police_personnel_by_id = (req, res, next) => {
    const id = req.params.id;
    Police.getPersonnelById(id).then(([personnel, others]) => {
        const photo_filename = personnel[0].photo_filename;
        file_handling.delete_file('public/images/polices/' + photo_filename);
        return Police.deletePersonnelById(id);
    }).then(result => {
        // console.log(result);
        res.redirect('/admin/polices_details');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/polices_details');
    })
}

exports.search_police = (req, res, next) => {
    const search_text = req.body.search_text;
    // console.log(search_text);
    Police.searchPolice(search_text).then(([polices, others]) => {
        // console.log(crimes);
        res.render('police/search_results', {
            page_title: 'Search Results',
            path: '/admin/search',
            polices: polices
        })
    }).catch(err => {
        console.log(err);
    })
}