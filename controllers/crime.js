const crimeModel = require('../models/crime');
const Criminal = require('../models/criminal');

const Crime = crimeModel.Crime;
const All_crime_types = crimeModel.All_crime_types;
const Crime_to_crimeTypes = crimeModel.Crime_to_crimeTypes;
const Crime_criminal = crimeModel.Crime_criminal;

const date_convertor = require('../utils/date_convertor');


exports.get_crimes_details = (req, res, next) => {
    let crimes_types;
    All_crime_types.getAllCrimeTypes().then(([data, others]) => {
        crimes_types = data;
        return Crime.getAllCrimes();
    }).then(([data, others]) => {
        data.forEach(crime=>{
            crime.date=date_convertor.date_to_YYYY_MM_DD(crime.date);
        });
        data.crimes_types = crimes_types;
        // console.log(data);s
        res.render('crime/crimes_details', {
            page_title: 'Crimes',
            path: '/crime/crimes_details',
            crimes: data
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.get_add_crime_detail = (req, res, next) => {
    All_crime_types.getAllCrimeTypes().then(([crimes_types, others]) => {

        res.render('crime/add_crime', {
            page_title: 'Add Crime',
            path: '/crime/add_crime',
            crime_types: crimes_types,
            isEditing: false,
            error_msg: ''
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.post_add_crime_detail = (req, res, next) => {
    // console.log(req.body);
    const date = req.body.date;
    const city = req.body.city;
    const description = req.body.description;

    var crime_types_ids = req.body.crime_types;
    if (!Array.isArray(crime_types_ids)) {  // if criminalIDs is single string
        crime_types_ids = [crime_types_ids];
    }

    var criminalIDs = req.body.criminal_id;
    if (!Array.isArray(criminalIDs)) {  // if criminalIDs is single string
        criminalIDs = [criminalIDs];
    }
    else {
        criminalIDs = [...new Set(criminalIDs)];    //remove duplicate elements
    }
    // console.log(criminalIDs);
    criminalIDs.map(c => c.trim());
    criminalIDs = criminalIDs.filter(c => (c != '' && c != ' '));


    Criminal.isAllCriminalsExists(criminalIDs).then(([[{ count }], others]) => {
        // console.log(count);

        if (count !== criminalIDs.length) {

            All_crime_types.getAllCrimeTypes().then(([all_crime_types, others]) => {

                return res.render('crime/add_crime', {
                    page_title: 'Add Crime',
                    path: '/crime/add_crime',
                    crime_types: all_crime_types,
                    isEditing: false,
                    error_msg: 'Invalid Criminal ID'
                })
            });
            throw new Error('Invalid Criminal ID');

        }

        const newCrime = new Crime(null, date, city, description);

        return newCrime.addCrime();
    }).then(([result]) => {
        // console.log(result);
        crimeId = result.insertId;
        // console.log('new Crime Id - ' + crimeId);

        const crime_to_crimeTypes = new Crime_to_crimeTypes(crimeId, crime_types_ids);
        return crime_to_crimeTypes.addCrimeTypes();
    }).then(result => {
        // console.log(result);
        return Crime_criminal.addMultipleCrime_criminal(crimeId, criminalIDs);

    }).then(result => {
        // console.log(result);

        res.redirect('/crime/crimes_details');

    }).catch(err => {
        console.log(err);
    })
}


exports.get_crime_detail_by_ID = (req, res, next) => {
    const crimeId = req.params.id;
    let selected_crime_type_names = [], crime_data;
    Crime.getCrimeById(crimeId).then(([data, others]) => {
        crime_data = data[0]
        crime_data.date=date_convertor.date_to_YYYY_MM_DD(crime_data.date);
        // console.log(crime_data);
        return Crime_to_crimeTypes.getCrimeTypeNamesByCrimeId(crimeId);
    }).then(([data, others]) => {
        // console.log(data);
        data.forEach(ct => {
            selected_crime_type_names.push(ct.type_name);
        })
        crime_data.crime_type_names = selected_crime_type_names;

        return Crime_criminal.getAllCriminalsByCrimeID(crimeId);
    }).then(([criminals, others]) => {
        // console.log(criminals);
        res.render('crime/crime_detail', {
            page_title: 'Crime Detail',
            path: '/crime/crime_detail',
            crime: crime_data,
            criminals: criminals,
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.get_edit_crime_detail = (req, res, next) => {
    const crimeId = req.params.id;
    let selected_crime_type_ids = [], crime_data;
    var criminals;
    Crime.getCrimeById(crimeId).then(([data, others]) => {
        crime_data = data[0];
        // console.log(crime_data);
        
        crime_data.date=date_convertor.date_to_YYYY_MM_DD(crime_data.date);
        
        
        return Crime_criminal.getAllCriminalsByCrimeID(crimeId);
    }).then(([data, others]) => {
        criminals = data;

        return Crime_to_crimeTypes.getCrimeTypeIDsByCrimeID(crimeId);
    }).then(([data, others]) => {
        // console.log(data);

        data.forEach(ct => {
            selected_crime_type_ids.push(ct.crime_type_id);
        })
        return All_crime_types.getAllCrimeTypes();

    }).then(([crime_types, others]) => {
        // console.log(crime_types);
        crime_types.forEach(ct => {
            if (selected_crime_type_ids.includes(ct.id)) {
                ct.isSelected = true;
            }
            else
                ct.isSelected = false;
        })

        

        res.render('crime/add_crime', {
            page_title: 'Edit Crime',
            path: '/crime/edit_crime_detail',
            crime_types: crime_types,
            isEditing: true,
            crime: crime_data,
            error_msg: '',
            criminals: criminals,
        })

    }).catch(err => {
        console.log(err);
    })

}

exports.post_edit_crime_detail = (req, res, next) => {
    // console.log(req.body);
    const crimeId = req.params.id;

    const date = req.body.date;
    const city = req.body.city;
    const description = req.body.description;
    var crime_types_ids = req.body.crime_types;
    if (!Array.isArray(crime_types_ids)) {  // if criminalIDs is single string
        crime_types_ids = [crime_types_ids];
    }

    var criminalIDs = req.body.criminal_id;
    if (!Array.isArray(criminalIDs)) {  // if criminalIDs is single string
        criminalIDs = [criminalIDs];
    }
    else {
        criminalIDs = [...new Set(criminalIDs)];    //remove duplicate elements
    }
    // console.log('criminalIDs - ' + criminalIDs);
    criminalIDs.map(c => c.trim());
    criminalIDs = criminalIDs.filter(c => (c != '' && c != ' '));


    Criminal.isAllCriminalsExists(criminalIDs).then(([[{ count }], others]) => {
        // console.log(count);

        if (count !== criminalIDs.length) {

            throw new Error('Invalid Criminal ID');
        }
        const newCrime = new Crime(crimeId, date, city, description);
        // console.log('updating crime');
        return newCrime.updateCrime()

    }).then(([result]) => {
        // console.log(result);
        return Crime_to_crimeTypes.deleteAllByCrimeID(crimeId);
    }).then(result => {
        const crime_to_crimeTypes = new Crime_to_crimeTypes(crimeId, crime_types_ids);
        return crime_to_crimeTypes.addCrimeTypes();

    }).then(result => {
        // console.log(result);
        return Crime_criminal.deleteAllRecordsByCrimeID(crimeId);

    }).then(result => {
        // console.log(result);

        return Crime_criminal.addMultipleCrime_criminal(crimeId, criminalIDs);
    }).then(result => {
        // console.log(result);

        res.redirect('/crime/crime_detail/' + crimeId);
    }).catch(err => {
        console.log(err);
        res.redirect('/crime/edit_crime/' + crimeId);
    })
}

exports.delete_crime_by_id = (req, res, next) => {
    const crimeId = req.params.id;
    Crime.deleteCrimeByID(crimeId).then(result => {
        // console.log(result);
        res.redirect('/crime/crimes_details');

    }).catch(err => {
        console.log(err);
    })
}


exports.search_crime = (req, res, next) => {
    const search_text = req.body.search_text;
    // console.log(search_text);
    Crime.searchCrime(search_text).then(([crimes, others]) => {
        // console.log(crimes);
        crimes.forEach(crime=>{
            crime.date=date_convertor.date_to_YYYY_MM_DD(crime.date);
        })
        res.render('crime/search_results', {
            page_title: 'Search Results',
            path: '/crime/search',
            crimes: crimes
        })
    }).catch(err => {
        console.log(err);
    })
}