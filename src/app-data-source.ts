import { DataSource } from "typeorm";
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV)
let entitiesPath: string;
if (isProduction) {
  entitiesPath = path.join(__dirname, 'entities/*.js');
} else {
  entitiesPath = path.join(__dirname, 'entities/*.ts');
}

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: "dev",
    password: process.env.DB_PASSWORD ,
    database: "user_mgmt",
    entities: [entitiesPath],
    logging: true,
    synchronize: true
});