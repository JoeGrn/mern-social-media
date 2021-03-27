import * as dotenv from 'dotenv';

dotenv.config();

declare const process: {
    env: {
        DB_STRING: string;
        JWT_KEY: string;
    };
};

export const DB_STRING: string = process.env.DB_STRING;
export const JWT_KEY: string = process.env.JWT_KEY;

export const PORT: number = 5000

