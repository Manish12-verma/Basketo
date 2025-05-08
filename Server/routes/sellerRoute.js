import express from 'express';
import {  sellerLogin, isSellerAuth, logoutSeller } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();


sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', logoutSeller); // Assuming you have a logoutUser function in your controller

export default sellerRouter