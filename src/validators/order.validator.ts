import Joi from "joi";

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from "../enums";

const orderValidator = Joi.object({
    group_id: Joi.number()
        .messages({
            'number.base': 'Group selection is required'
        }),
    name: Joi.string()
        .messages({
            'string.pattern.base': 'Name must be a string',
        }),
    surname: Joi.string()
        .messages({
            'string.pattern.base': 'Surname must be a string',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false }})
        .messages({
            'string.email': 'Email must have a domain only "com" and "net"'
        }),
    phone: Joi.string()
        .regex(/^\d{12}$/)
        .messages({
            'string.pattern.base': 'Phone must have only 12 digits'
        }),
    age: Joi.number()
        .integer()
        .min(16)
        .max(90)
        .messages({
            'number.base': 'Invalid age',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age must be at least 16',
            'number.max': 'Age cann',
        }),
    sum: Joi.number()
        .integer()
        .min(1)
        .max(1000000)
        .messages({
            'number.base': 'Invalid sum',
            'number.integer': 'Sum must be an integer',
            'number.min': 'Sum must be at least 1',
            'number.max': 'Sum cannot be more than 1000000'
        }),
    alreadyPaid: Joi.number()
        .integer()
        .min(1)
        .max(1000000)
        .messages({
            'number.base': 'Invalid field already paid',
            'number.integer': 'Already paid must be an integer',
            'number.min': 'Already paid must be at least 1',
            'number.max': 'Already paid cannot be more than 1000000'
        }),
    course: Joi.string()
        .valid(CourseEnum.FS, CourseEnum.QACX, CourseEnum.JSCX, CourseEnum.JCX, CourseEnum.FE, CourseEnum.PCX)
        .messages({
            'string.only': 'Invalid course selection'
        }),
    course_format: Joi.string()
        .valid(CourseFormatEnum.STATIC, CourseFormatEnum.ONLINE)
        .messages({
            'string.only': 'Invalid course format selection'
        }),
    course_type: Joi.string()
        .valid(
            CourseTypeEnum.PRO, 
            CourseTypeEnum.MINIMAL, 
            CourseTypeEnum.PREMIUM, 
            CourseTypeEnum.INCUBATOR, 
            CourseTypeEnum.VIP
        )
        .messages({
            'string.only': 'Invalid course type selection'
        }),
    status: Joi.string()
        .valid(StatusEnum.NEW, StatusEnum.IN_WORK, StatusEnum.AGREE, StatusEnum.DISAGREE, StatusEnum.DUBBING)
        .messages({
            'string.only': 'Invalid status selection'
        })
});

export {
    orderValidator
};
