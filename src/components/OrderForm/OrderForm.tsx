import { ChangeEvent, FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { groupActions, orderActions, orderActions2 } from "../../redux";
import { Group } from "../Group/Group";
import { GroupForm } from "../GroupForm/GroupForm";
import { IOrder } from "../../interfaces";
import { IFuncVoid } from "../../types";
import { joiResolver } from "@hookform/resolvers/joi";
import { orderValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from '../OrderForm2/OrderForm2.module.css';

const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const { groups, groupTrigger, vision, errorGroup } = useAppSelector(state => state.groupReducer);
    const { orderUpdate, errorsOrder, openOrderForm } = useAppSelector(state => state.orderReducer2);
    const { reset, handleSubmit, register, setValue, formState: { errors, isValid, touchedFields } } = useForm<IOrder>({
        mode: 'all',
        resolver: joiResolver(orderValidator),
    });
    const filterUpdateFields = (order: IOrder) => {
        return Object.fromEntries(
            Object.entries(order).filter(([_, value]) => value !== null && value !== '')
        );
    };
    const update: SubmitHandler<IOrder> = async (order: IOrder): Promise<void> => {
        const dataFilter: any = filterUpdateFields(order);
        console.log(dataFilter);
        await dispatch(orderActions.update({ id: orderUpdate.id, order }));
        reset();
    };
    const addGroup: IFuncVoid = (): void => {
        dispatch(groupActions.setVision(true));
    };
    const handleGroup = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions2.setOrderCreate(event.target.value));
    };
    const handleClose: IFuncVoid = (): void => {
        dispatch(orderActions2.closeForm());
        dispatch(groupActions.setVisionDefault());
        reset();
    };
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch, groupTrigger]);
    useEffect(() => {
        if (orderUpdate) {
            setValue('group_id', orderUpdate.group_id);
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
        }
    }, [orderUpdate, setValue]);

    return (
        <Modal
            size='lg'
            show={ openOrderForm }
            onHide={ handleClose }
            backdrop='static'
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <div className={ vision ? css.Group_form : 'd-none' }>
                <GroupForm />
            </div>
            <Form onSubmit={ handleSubmit(update) }>
                <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                    <Container>
                        <Row>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    className={ vision ? 'd-none' : 'd-flex flex-column' }
                                    controlId='floatingSelectGrid'
                                    label='Choice a group'
                                >
                                    <Form.Select
                                        aria-label='Floating label select example'
                                        onChange={ handleGroup }
                                        isValid={ touchedFields.group_id }
                                        { ...register('group_id') }
                                    >
                                        {
                                            groups.map(group =>
                                                <Group
                                                    key={ group.id }
                                                    group={ group }
                                                />)
                                        }
                                    </Form.Select>
                                    <button
                                        type='button'
                                        className={ css.Btn_group }
                                        onClick={ addGroup }
                                    >
                                        Add&#160;group
                                    </button>
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingSelectGrid'
                                    label='Choice a status'
                                >
                                    <Form.Select
                                        aria-label='Floating label select example'
                                        { ...register('status') }
                                    >
                                        <option>{ StatusEnum.NEW }</option>
                                        <option>{ StatusEnum.IN_WORK }</option>
                                        <option>{ StatusEnum.AGREE }</option>
                                        <option>{ StatusEnum.DISAGREE }</option>
                                        <option>{ StatusEnum.DUBBING }</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                    <Container className='mt-4'>
                        <Row>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingInputGrid'
                                    label='Name'
                                >
                                    <Form.Control
                                        type='text'
                                        placeholder='name'
                                        { ...register('name') }
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingInputGrid'
                                    label='Sum'
                                >
                                    <Form.Control
                                        type='text'
                                        placeholder='sum'
                                        { ...register('sum') }
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue' }}>
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={ handleClose }
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={ !isValid }
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export {
    OrderForm
};
