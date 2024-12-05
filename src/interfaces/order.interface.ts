import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../enums';

export interface IOrder {
    id: number;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: CourseEnum;
    course_format?: CourseFormatEnum;
    course_type?: CourseTypeEnum;
    status?: StatusEnum;
    sum?: number;
    already_paid?: number;
    created_at: string;
}
