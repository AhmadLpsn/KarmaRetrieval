import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  console.log("⚠️  Couldn't find .env file  ⚠️");
  process.exit();
}


export const port = parseInt(process.env.PORT, 10)

export const dbConfig = {
  host:process.env.DB_URI,
  port:Number(process.env.DB_PORT),
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
}



