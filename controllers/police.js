const Police = require('../models/police');


exports.get_police_dashboard = (req, res, next) => {
    // console.log(req.session);
    
    res.render('police/dashboard', {
        page_title: 'Police Dashboard',
        path: '/police/dashboard',

    });
}

