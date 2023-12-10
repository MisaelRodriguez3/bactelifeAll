import express from 'express';
import app from './app.js';
import { connection } from './db.js';

app.use(express.urlencoded({ extended: false }));

connection()
app.listen(process.env.PORT || 3000) //ready to accept the port in production
console.log("On port ", process.env.PORT || 3000)