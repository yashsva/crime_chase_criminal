const mysql = require('mysql2');

//To get API keys from .env files (Using process.env.<variable_name> )
require('dotenv').config();

const ssl_cert=fs.readFileSync(path.join(__dirname,"..","BaltimoreCyberTrustRoot.crt.pem"));


const pool=mysql.createPool({
    host:process.env.MYSQL_HOST,
    database:process.env.MYSQL_DATABASE,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    ssl:{
        ca:ssl_cert,
    }  
});

module.exports=pool.promise(); 