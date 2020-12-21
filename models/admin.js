const db = require("../utils/database")

module.exports=class Admin{

    constructor(ID,password){
        this.ID=ID;
        this.password=password;
    }

    static getAdminById(ID){
        return db.execute('SELECT * FROM admin WHERE id=?', [ID]);
    }
}