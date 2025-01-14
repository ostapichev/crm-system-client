import { IComment } from './comment.interface';
import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../enums';
import { IUser } from './user.interface';

export interface IOrder {
    id?: number;
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
    alreadyPaid?: number;
    created_at?: string;
    manager?: IUser;
    group_id?: number;
    msg?: string;
    utm?: string;
    comments?: IComment[];
}
