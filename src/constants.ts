import * as dotenv from 'dotenv';

dotenv.config();

export const DB_STRING: any = process.env.DB_STRING;
export const JWT_KEY: any = process.env.JWT_KEY;

