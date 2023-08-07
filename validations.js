import {body} from 'express-validator';

export const loginValidation = [
    body('email','Должен быть корректная почта').isEmail(),
    body('password','Не хватает еще').isLength({min:5}),
];


export const registerValidation = [
    body('email','Должен быть корректная почта').isEmail(),
    body('password','Не хватает еще').isLength({min:5}),
    body('fullName').isLength({min:3}),
    body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
    body('title','Введите заголовок статьи').isLength({min:3}).isString(),
    body('text','Введите текст статьи').isLength({min:3}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];