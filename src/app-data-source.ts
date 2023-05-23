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
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "user_mgmt",
    entities: [entitiesPath],
    logging: true,
    synchronize: true,
});