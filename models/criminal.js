const db = require('../utils/database');

module.exports = class Criminal {
    constructor(id, name, photo_filename, height, weight, dob, city, gender) {
        this.id = id;
        this.name = name;
        this.photo_filename = photo_filename;
        this.height = height;
        this.weight = weight;
        this.dob = dob;
        this.city = city;
        this.gender = gender;
    }

    addCriminal() {
        return db.execute('INSERT INTO criminal (name,photo_filename,height,weight,dob,city,gender) VALUES (?,?,?,?,?,?,?)', [this.name, this.photo_filename, this.height, this.weight, this.dob, this.city, this.gender]);
    }

    updateCriminal() {

        return db.execute('UPDATE criminal SET name=?,photo_filename=?,height=?,weight=?,dob=?,city=?,gender=? WHERE criminal.id=?', [this.name, this.photo_filename, this.height, this.weight, this.dob, this.city, this.gender, this.id])
    }

    static getAllCriminals() {
        return db.execute('SELECT * FROM criminal');
    }

    static getCriminalById(id) {
        return db.execute('SELECT * FROM criminal WHERE criminal.id=?', [id]);
    }

    static deleteCriminalById(id) {
        return db.execute('DELETE FROM criminal WHERE criminal.id=?', [id]);
    }

    static searchCriminal(searchText) {
        searchText = '%' + searchText + '%';
        // console.log(searchText);
        return db.execute("SELECT * FROM criminal WHERE (id LIKE ? OR name LIKE ? OR city LIKE ? OR gender LIKE ? OR dob LIKE ?)", [searchText, searchText, searchText, searchText, searchText]);

    }

    static isAllCriminalsExists(criminalIDs) {

        // console.log('criminalIDs - ' +(criminalIDs));

        return db.query('SELECT COUNT(*) AS count FROM criminal WHERE id IN (?)', [criminalIDs]);

    }
}

