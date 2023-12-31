import express from 'express';
import multer from 'multer';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.ficrkh0.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('Db  ok'))
.catch((err) => console.log('DB error', err))

const app = express();

app.get('/', (req,res) => {
    res.send('Hello User Madiyar');
});

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null,'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage })

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)



app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/auth/me',checkAuth, UserController.GetMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);

app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', postCreateValidation, handleValidationErrors , PostController.update);

app.listen(5000, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server Ok!');
})