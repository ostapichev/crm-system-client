import Joi from 'joi';

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../enums';

const orderValidator = Joi.object({
    group_id: Joi.number()
        .empty('')
        .optional()
        .messages({
            'number.base': 'Only special format. Example "dec-2022".',
        }),
    name: Joi.string()
        .empty('')
        .optional()
        .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
        .messages({
            'string.pattern.base': 'First letter uppercase min 2 max 20 ch',
        }),
    surname: Joi.string()
        .empty('')
        .optional()
        .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
        .messages({
            'string.pattern.base': 'First letter uppercase min 2 max 20 ch',
        }),
    email: Joi.string()
        .empty('')
        .optional()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.email': 'Email must have a domain only "com" and "net"',
        }),
    phone: Joi.string()
        .empty('')
        .optional()
        .regex(/^\d{12}$/)
        .messages({
            'string.pattern.base': 'Phone must have only 12 digits',
        }),
    age: Joi.number()
        .empty('')
        .optional()
        .integer()
        .min(16)
        .max(90)
        .messages({
            'number.base': 'Invalid age',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age must be at least 16',
            'number.max': 'Age cannot be more than 90',
        }),
    sum: Joi.number()
        .empty('')
        .optional()
        .integer()
        .messages({
            'number.base': 'Invalid sum',
            'number.integer': 'Sum must be an integer',
        }),
    alreadyPaid: Joi.number()
        .empty('')
        .optional()
        .integer()
        .messages({
            'number.base': 'Invalid field already paid',
            'number.integer': 'Already paid must be an integer',
        }),
    course: Joi.string()
        .empty('')
        .optional()
        .valid(CourseEnum.JSCX, CourseEnum.PCX, CourseEnum.FS, CourseEnum.JCX, CourseEnum.FE, CourseEnum.QACX)
        .messages({
            'any.only': 'Invalid course selection',
        }),
    course_format: Joi.string()
        .empty('')
        .optional()
        .valid(CourseFormatEnum.STATIC, CourseFormatEnum.ONLINE)
        .messages({
            'any.only': 'Invalid course format selection',
        }),
    course_type: Joi.string()
        .empty('')
        .optional()
        .valid(CourseTypeEnum.MINIMAL, CourseTypeEnum.PREMIUM, CourseTypeEnum.PRO, CourseTypeEnum.VIP, CourseTypeEnum.INCUBATOR)
        .messages({
            'any.only': 'Invalid course type selection',
        }),
    status: Joi.string()
        .empty('')
        .optional()
        .valid(StatusEnum.NEW, StatusEnum.IN_WORK, StatusEnum.AGREE, StatusEnum.DISAGREE, StatusEnum.DUBBING)
        .messages({
            'any.only': 'Invalid status selection',
        }),
});

export {
    orderValidator
};
