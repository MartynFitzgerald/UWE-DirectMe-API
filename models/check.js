/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  check.js  
|  Description:  The function here is used 
*===========================================================================*/
var dbController = require('./dbconnection');
/* 
  A function that receives an user id as an api key to check weather the user
  are allowed to receive the result of their request.
*/
exports.key = async function(api_key, callback) {
  dbController.connection.query(`SELECT * FROM admin WHERE user_id="${api_key}"`, function(error, results, fields) {
    if (error || !results) {
      console.error(`SQL - SELECT * FROM admin WHERE user_id="${api_key}"`);
      //Return false if error within sql.
      callback(false);
    } else if (results[0] != null || results[0] != undefined) {
      if (results[0].api_usage == -1) {
        //Return true since the limit is unlimited.
        callback(true);
      } else if (results[0].api_usage <= 2000) {
        dbController.connection.query(`UPDATE admin SET api_usage=api_usage+1 WHERE user_id="${api_key}"`, function(error, results, fields) {
          if (error || !results) {
            console.error(`SQL - UPDATE admin SET api_usage=api_usage+1 WHERE user_id="${api_key}"`);
            //Return false if error within sql.
            callback(false);
          }
          //Return true once updated api_usage.
          callback(true);
        });
      }
    } else {
      //Return false if no API key found.
      callback(false);
    }
  });
};