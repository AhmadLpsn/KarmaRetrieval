**Requerments** 

 - [MySql](https://www.mysql.com/) 8 
 - [Node.js](https://nodejs.org/en/) 18

**Installation**

first install the requierd packages
   

     npm i
 then add `.env` file to the root of the project directory,
 you can clone it from `.env.bak`
 inside `.env` file you have to set our database configurations and seeds size `DB_SEED_SIZE`
 then you have to build the project 

    npm run build

then to seed your database run 

    npm run seed

if you want to test APIs run 

    npm run test

now feel free to run the project

    npm start	
project provided with `karmaScore.postman_collection.json` can be imported into [Postman](https://www.postman.com/)