import mysql from 'mysql2/promise';

import { HOST, USER, PASSWORD, DATABASE } from "$env/static/private";

export const mysqlConnection = async () => {

    const pool = mysql.createPool({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      port: 3306,
    });

  return pool;
  
}