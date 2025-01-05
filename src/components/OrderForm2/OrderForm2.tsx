import { ChangeEvent, FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import Form from 'react-bootstrap/Form';

import { groupActions, orderActions, orderActions2 } from "../../redux";
import { Group } from "../Group/Group";
import { GroupForm } from "../GroupForm/GroupForm";
import { IOrder } from "../../interfaces";
import { IFuncVoid } from "../../types";
import { joiResolver } from "@hookform/resolvers/joi";
import { orderValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './OrderForm2.module.css';

const OrderForm2: FC = () => {
    const dispatch = useAppDispatch();
    const {groups, groupTrigger, vision, errorGroup} = useAppSelector(state => state.groupReducer);
    const {orderUpdate, errorsOrder, openOrderForm} = useAppSelector(state => state.orderReducer2);
    const {reset, handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IOrder>({
        mode: 'all',
        resolver: joiResolver(orderValidator)
    });
    const update: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.update({id: orderUpdate.id, order}));
        reset();
    };
    const addGroup: IFuncVoid = () => {
        dispatch(groupActions.setVision(false));
    };
    const handleGroup = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions2.setOrderCreate(event.target.value));
    };
    const handleClose: IFuncVoid = () => {
        dispatch(orderActions2.closeForm());
        dispatch(groupActions.setVisionDefault());
        reset();
    };
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch, groupTrigger]);
    useEffect(() => {
        if (orderUpdate) {
            setValue('name', orderUpdate.name);
            setValue('surname', orderUpdate.surname);
            setValue('email', orderUpdate.email);
            setValue('phone', orderUpdate.phone);
            setValue('age', orderUpdate.age);
            setValue('sum', orderUpdate.sum);
            setValue('alreadyPaid', orderUpdate.alreadyPaid);
            setValue('course', orderUpdate.course);
            setValue('course_format', orderUpdate.course_format);
            setValue('course_type', orderUpdate.course_type);
            setValue('status', orderUpdate.status);
            setValue('group_id', orderUpdate.group_id);
        }
    }, [orderUpdate, setValue]);

    return (
        <div className={`${css.modal_form} ${openOrderForm ? css.order_form : 'd-none'}`}>
            <h3 className={css.order_form_header}>{orderUpdate ? 'Update' : 'Create'}&nbsp;order</h3>
            {vision &&
                <div className={css.group_form}>
                    <GroupForm />
                </div>
            }
            <Form className={css.order_form_container} onSubmit={handleSubmit(update)}>
                <div className={css.form_block_left}>
                    <label className={vision ? 'd-none' : 'd-flex flex-column'}>
                        Group
                        <Form.Select
                            size="sm"
                            aria-label="Group"
                            {...register('group_id')}
                            onChange={handleGroup}
                        >
                            <option>Choose group</option>
                            {
                                groups.map(group => <Group
                                    key={group.id}
                                    group={group}
                                />)
                            }
                        </Form.Select>
                        <button type="button" className={css.btn_group} onClick={addGroup}>Add&#160;group</button>
                    </label>
                    { errors.group_id && <div className={css.err_text}>{errors.group_id.message}</div> }
                    { errorGroup?.name && <div className={css.err_text}>{errorGroup.name}</div> }
                    <label className='w-100'>
                        First&#160;name
                        <Form.Control
                            type="text"
                            size="sm"
                            placeholder='enter name'
                            {...register('name')}
                        />
                    </label>
                    { errors.name && <div className={css.err_text}>{errors.name.message}</div> }
                    <label className='w-100'>
                        Surname
                        <Form.Control
                            type="text"
                            size="sm"
                            placeholder='enter surname'
                            {...register('surname')}
                        />
                    </label>
                    { errors.surname && <div className={css.err_text}>{errors.surname.message}</div> }
                    { errorsOrder?.surname && <div className={css.err_text}>{errorsOrder.surname}</div> }
                    <label className='w-100'>
                        Email
                        <Form.Control
                            type="email"
                            size="sm"
                            placeholder='enter email'
                            {...register('email')}
                        />
                    </label>
                    { errors.email && <div className={css.err_text}>{errors.email.message}</div> }
                    { errorsOrder?.email && <div className={css.err_text}>{errorsOrder.email}</div> }
                    <label className='w-100'>
                        Phone
                        <Form.Control
                            type="text"
                            size="sm"
                            placeholder='enter phone'
                            {...register('phone')}
                        />
                    </label>
                    { errors.phone && <div className={css.err_text}>{errors.phone.message}</div> }
                    { errorsOrder?.phone && <div className={css.err_text}>{errorsOrder.phone}</div> }
                    <label className='w-100'>
                        Age
                        <Form.Control
                            type="number"
                            size="sm"
                            placeholder='enter age'
                            {...register('age')}
                        />
                    </label>
                    { errors.age && <div className={css.err_text}>{errors.age.message}</div> }
                </div>
                <div className={vision ? css.form_block_right_top : css.form_block_right}>
                    <label className='w-100'>
                        Choose&#160;course
                        <Form.Select
                            size="sm"
                            aria-label="Choose_course"
                            {...register('course')}
                        >
                            <option value="FS">FS</option>
                            <option value="QACX">QACX</option>
                            <option value="JSCX">JSCX</option>
                            <option value="JCX">JCX</option>
                            <option value="FE">FE</option>
                            <option value="PCX">PCX</option>
                        </Form.Select>
                    </label>
                    { errors.course && <div className={css.err_text}>{errors.course.message}</div> }
                    <label className={css.input_paid}>
                        Already&#160;paid
                        <Form.Control
                            type="number"
                            size="sm"
                            placeholder='already_paid'
                            {...register('alreadyPaid')}
                        />
                    </label>
                    { errors.alreadyPaid &&
                        <div className={css.err_text}>{errors.alreadyPaid.message}</div>
                    }
                    <label className='w-100'>
                        Sum
                        <Form.Control
                            type="number"
                            size="sm"
                            placeholder='sum'
                            {...register('sum')}
                        />
                    </label>
                    { errors.sum && <div className={css.err_text}>{errors.sum.message}</div> }
                    <label className='w-100'>
                        Choose&#160;course&#160;format
                        <Form.Select
                            size="sm"
                            aria-label="Default select example"
                            {...register('course_format')}
                        >
                            <option value="static">static</option>
                            <option value="online">online</option>
                        </Form.Select>
                    </label>
                    { errors.course_format &&
                        <div className={css.err_text}>
                            {errors.course_format.message}
                        </div>
                    }
                    <label className='w-100'>
                        Choose&#160;course&#160;type
                        <Form.Select
                            size="sm"
                            aria-label="Course_type"
                            {...register('course_type')}
                        >
                            <option value="pro">pro</option>
                            <option value="minimal">minimal</option>
                            <option value="premium">premium</option>
                            <option value="incubator">incubator</option>
                            <option value="vip">vip</option>
                        </Form.Select>
                    </label>
                    { errors.course_type && <div className={css.err_text}>{errors.course_type.message}</div> }
                    <label className='w-100'>
                        Choose&#160;status
                        <Form.Select
                            size="sm"
                            aria-label="Status"
                            {...register('status')}
                        >
                            <option value="new_order">new_order</option>
                            <option value="in_work">in_work</option>
                            <option value="agree">agree</option>
                            <option value="disagree">disagree</option>
                            <option value="dubbing">dubbing</option>
                        </Form.Select>
                    </label>
                    { errors.status && <div className={css.err_text}>{errors.status.message}</div> }
                </div>
                <div className={css.button_block}>
                    <button
                        type="submit"
                        className={css.btn_form}
                    >
                        {orderUpdate ? 'Update' : 'Save'}
                    </button>
                    <button
                        type="button"
                        className={css.btn_form}
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </Form>
        </div>
    );
};

export {
    OrderForm2
};