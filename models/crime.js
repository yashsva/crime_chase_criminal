const db = require('../utils/database');

class Crime {
    constructor(id, date, city, description) {
        this.id = id;
        this.date = date;
        this.city = city;
        this.description = description;

    }

    addCrime() {
        return db.execute('INSERT INTO crime (id,date,city,description) VALUES (?,?,?,?)', [this.id, this.date, this.city, this.description]);
    }

    updateCrime(){
        return db.execute('UPDATE crime SET date=?,city=?,description=? WHERE id=?',[this.date,this.city,this.description,this.id])
    }

    static getAllCrimes() {
        return db.execute('SELECT * FROM crime ');
    }

    static getCrimeById(id){
        return db.execute('SELECT * FROM crime WHERE id=? ',[id]);
    }

    static deleteCrimeByID(id){
        return db.execute('DELETE FROM crime WHERE id=?',[id]);
    }

    static searchCrime(searchText){
        searchText='%'+searchText+'%';
        // console.log(searchText);
        return db.execute("SELECT * FROM crime WHERE (id LIKE ? OR date LIKE ? OR city LIKE ? )",[searchText,searchText,searchText]);
        
    }

    // static getIdOfLastCrime(){
    //     return db.execute('SELECT LAST_INSERT_ID()');
    // }

};

class Crime_to_crimeTypes {
    constructor(crimeId, crimeTypeIds) {
        this.crimeId = crimeId;
        this.crimeTypeIds = crimeTypeIds;     // array of crime_type ids
    }

    addCrimeTypes() {
        let query = 'INSERT INTO crime_to_crime_types (crime_id,crime_type_id)  VALUES ';
        
        this.crimeTypeIds.forEach(ctID => {
            query+='('+this.crimeId+','+ctID+'),'
            
        });
        query=query.slice(0,-1);    //remove comma(,) from end
        // console.log(query);
        return db.execute(query);
    }

    static getCrimeTypeNamesByCrimeId(crimeId){
        return db.execute('SELECT ct.type_name  FROM all_crime_types ct JOIN crime_to_crime_types c_ct ON ct.id=c_ct.crime_type_id WHERE c_ct.crime_id=?',[crimeId])
    }

    static getCrimeTypeIDsByCrimeID(crimeId){
        return db.execute('SELECT crime_type_id FROM crime_to_crime_types WHERE crime_id=?',[crimeId]);
    }

    static deleteAllByCrimeID(crimeId){
        return db.execute('DELETE FROM crime_to_crime_types WHERE crime_id=?',[crimeId]);
    }

};


class All_crime_types {
    constructor(id, type_name) {
        this.id = id;
        this.type_name = type_name;
    }

    static getAllCrimeTypes() {
        return db.execute('SELECT * FROM all_crime_types ');
    };
};


class Crime_criminal{
    constructor(crimeId,criminalId){
        this.crimeId=crimeId;
        this.criminalId=criminalId;
    }

    addCrime_criminal(){
        return db.execute('INSERT INTO crime_criminal (crime_id,criminal_id) VALUES (?,?)',[this.crimeId,this.criminalId]);
    }

    static addMultipleCrime_criminal(crimeId,criminalIds){
        let query = 'INSERT INTO crime_criminal (crime_id,criminal_id)  VALUES ';
        
        criminalIds.forEach(ID => {
            query+='('+crimeId+','+ID+'),'
            
        });
        query=query.slice(0,-1);    //remove comma(,) from end
        // console.log(query);
        return db.execute(query);
    }
    
    static  getAllCriminalsByCrimeID(crimeId){
        return db.execute('SELECT  name,photo_filename,id,city FROM criminal JOIN crime_criminal cc ON cc.criminal_id=criminal.id WHERE cc.crime_id=?',[crimeId])
    }

    static deleteAllRecordsByCrimeID(crimeId){
        return db.execute('DELETE FROM crime_criminal WHERE crime_id=?',[crimeId]);
    }
}

module.exports = {
    Crime,
    All_crime_types,
    Crime_to_crimeTypes,
    Crime_criminal
}