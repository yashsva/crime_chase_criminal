const Police = require("../models/police");
const Admin = require("../models/admin");

exports.get_police_login = (req, res, next) => {
    res.render('login', {
        page_title: 'Police Login',
        path: '/auth/police_login',
        error_msg: '',
        form_action_url: '/auth/police_login'
    });
}

exports.post_police_login = (req, res, next) => {
    // console.log(req.body);
    const userID = req.body.userID;
    const password = req.body.password;

    console.log("userID - " + userID + "\npassword - " + password);

    return Police.getPersonnelById(userID).then(([personnel, others]) => {
        // console.log(personnel);
        
        if (personnel.length>0 && personnel[0].password === password) {
            req.session.isLoggedIn = true;
            req.session.isAdmin = false;
            return req.session.save((err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/police/dashboard');
            });
        }else{
            return res.render('login', {
                page_title: 'Police Login',
                path: '/auth/police_login',
                error_msg: 'Invalid credentials',
                form_action_url: '/auth/police_login'
            });
        }
    })

    
}

exports.get_admin_login = (req, res, next) => {
    res.render('login', {
        page_title: 'Admin Login',
        path: '/auth/admin_login',
        error_msg: '',
        form_action_url: '/auth/admin_login'
    });
}

exports.post_admin_login = (req, res, next) => {
    // console.log(req.body);
    const userID = req.body.userID;
    const password = req.body.password;

    console.log("username - " + userID + "\npassword - " + password);

    return Admin.getAdminById(userID).then(([admin,others])=>{
        
        if (admin.length>0 && admin[0].password == password) {
            req.session.isLoggedIn = true;
            req.session.isAdmin = true;
            return req.session.save(function (err) {
                if (err) {
                    console.log(err);
                }
    
                return res.redirect('/admin/dashboard');
            });
        }
        else {
            return res.render('login', {
                page_title: 'Admin Login',
                path: '/admin/login',
                error_msg: 'Invalid credentials',
                form_action_url: '/auth/admin_login'
            });
        }

    })
}

exports.logout = (req, res, next) => {

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}