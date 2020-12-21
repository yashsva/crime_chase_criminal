const db = require('../utils/database');

module.exports = class Police {
    constructor(id, name, email, department, phone, password, dob,photo_filename,gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.phone = phone;
        this.password = password
        this.dob = dob;
        this.photo_filename=photo_filename;
        this.gender=gender
    }


    addPolice() {

        return db.execute('INSERT INTO police (name,email,phone,department,password,dob,photo_filename,gender) VALUES (?,?,?,?,?,?,?,?)', [this.name, this.email, this.phone, this.department, this.password, this.dob,this.photo_filename,this.gender])
    }

    updatePersonnelInfo(){
        return db.execute('UPDATE police SET name=?,email=?,phone=?,department=?,password=?,dob=?,photo_filename=?,gender=? WHERE police.id=?',[this.name, this.email, this.phone, this.department, this.password, this.dob,this.photo_filename,this.gender,this.id])
    }

    static getAllPoliceDetails() {
        return db.execute('SELECT * FROM police ');
    }

    static getPersonnelById(id){
        return db.execute('SELECT * FROM police WHERE police.id=? ',[id]);
    }

    static deletePersonnelById(id){
        return db.execute('DELETE FROM police WHERE police.id=?',[id]);
    }

    static searchPolice(searchText){
        searchText='%'+searchText+'%';
        // console.log(searchText);
        return db.execute("SELECT * FROM police WHERE (id LIKE ? OR name LIKE ? OR email LIKE ? OR phone LIKE ? OR dob LIKE ? OR department LIKE ? OR gender LIKE ?)",[searchText,searchText,searchText,searchText,searchText,searchText,searchText]);
        
    }

}