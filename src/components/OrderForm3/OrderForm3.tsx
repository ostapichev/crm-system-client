import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Alert, Button, Col, Container, FloatingLabel, Form, Image, Modal, Row } from 'react-bootstrap';

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { FormControlFeedbackGood } from '../FormControlFeedbackGood/FormControlFeedbackGood';
import { Group } from '../Group/Group';
import { GroupForm } from '../GroupForm/GroupForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { groupActions, orderActions } from '../../redux';
import { IFuncVoid } from '../../types';
import { orderValidator } from '../../validators';

import { okten_school_image } from '../../assets';
import css from './OrderForm.module.css';

const OrderForm3: FC = () => {
    const dispatch = useAppDispatch();
    const { groups, groupTrigger, vision } = useAppSelector(state => state.groupReducer);
    const { orderUpdate, showOrderForm, errorsOrder } = useAppSelector(state => state.orderReducer);
    const { reset, handleSubmit, register, setValue, getValues, formState: { errors, isValid }} = useForm<IOrder>({
        mode: 'all',
        resolver: joiResolver(orderValidator),
    });
    const getFilterUpdateFields: (order: IOrder) => IOrder = (order: IOrder): IOrder => {
        return Object.fromEntries(
            Object.entries(order).filter(([_, value]) => value !== null && value !== '' && value !== 0)
        );
    };
    const update: SubmitHandler<IOrder> = async (): Promise<void> => {
        const orderFilter = getFilterUpdateFields(getValues());
        const { meta: { requestStatus } } = await dispatch(orderActions.update({ id: orderUpdate.id, order: orderFilter }));
        if (requestStatus === 'fulfilled') reset();
    };
    const addGroup: IFuncVoid = (): void => {
        dispatch(groupActions.setVision(true));
    };
    const handleCloseForm: IFuncVoid = (): void => {
        dispatch(orderActions.setCloseOrderForm());
        dispatch(groupActions.setVision(false));
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
            show={ showOrderForm }
            onHide={ handleCloseForm }
            backdrop='static'
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
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
                                    isValid={ !errors.group_id }
                                    isInvalid={ !!errors.group_id }
                                    { ...register('group_id') }
                                >
                                    {
                                        groups.map(group =>
                                            <Group
                                                key={ group.id }
                                                group={ group }
                                            />)
                                    }
                                    { !errors.group_id && <FormControlFeedbackGood /> }
                                    { 
                                        errors.group_id && 
                                        <FormControlFeedbackError error={ errors.group_id.message } /> 
                                    }
                                </Form.Select>
                                <button
                                    type='button'
                                    className={ css.Button_group }
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
                                    isValid={ !errors.status }
                                    isInvalid={ !!errors.status }
                                    { ...register('status') }
                                >
                                    <option>{ StatusEnum.NEW }</option>
                                    <option>{ StatusEnum.IN_WORK }</option>
                                    <option>{ StatusEnum.AGREE }</option>
                                    <option>{ StatusEnum.DISAGREE }</option>
                                    <option>{ StatusEnum.DUBBING }</option>
                                    { errors.status && <FormControlFeedbackError error={ errors.status.message } /> }
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
                                    isValid={ !errors.name }
                                    isInvalid={ !!errors.name }
                                    { ...register('name') }
                                />
                                { errors.name && <FormControlFeedbackError error={ errors.name.message } /> }
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
                                    isValid={ !errors.sum }
                                    isInvalid={ !!errors.sum }
                                    { ...register('sum') }
                                />
                                { errors.sum && <FormControlFeedbackError error={ errors.sum.message } /> }
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-4'>
                    <Row>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingInputGrid'
                                label='Surname'
                            >
                                <Form.Control
                                    type='text'
                                    placeholder='surname'
                                    isValid={ !errors.surname }
                                    isInvalid={ !!errors.surname }
                                    { ...register('surname') }
                                />
                                { errors.surname && <FormControlFeedbackError error={ errors.surname.message } /> }
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingInputGrid'
                                label='AlreadyPaid'
                            >
                                <Form.Control
                                    type='text'
                                    placeholder='alreadyPaid'
                                    isValid={ !errors.alreadyPaid }
                                    isInvalid={ !!errors.alreadyPaid }
                                    { ...register('alreadyPaid') }
                                />
                                {
                                    errors.alreadyPaid &&
                                    <FormControlFeedbackError error={ errors.alreadyPaid.message } />
                                }
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-4'>
                    <Row>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingInputGrid'
                                label='Email'
                            >
                                <Form.Control
                                    type='email'
                                    placeholder='email'
                                    isValid={ !errors.email }
                                    isInvalid={ !!errors.email }
                                    { ...register('email') }
                                />
                                { errors.email && <FormControlFeedbackError error={ errors.email.message } /> }
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingSelectGrid'
                                label='Select a course'
                            >
                                <Form.Select
                                    aria-label='Floating label select example'
                                    isValid={ !errors.course }
                                    isInvalid={ !!errors.course }
                                    { ...register('course') }
                                >
                                    <option>{ CourseEnum.FE }</option>
                                    <option>{ CourseEnum.FS }</option>
                                    <option>{ CourseEnum.JCX }</option>
                                    <option>{ CourseEnum.QACX }</option>
                                    <option>{ CourseEnum.PCX }</option>
                                    <option>{ CourseEnum.JSCX }</option>
                                    { errors.course && <FormControlFeedbackError error={ errors.course.message } /> }
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
                                label='Phone'
                            >
                                <Form.Control
                                    type='text'
                                    placeholder='phone'
                                    isValid={ !errors.phone }
                                    isInvalid={ !!errors.phone }
                                    { ...register('phone') }
                                />
                                { errors.phone && <FormControlFeedbackError error={ errors.phone.message } /> }
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingSelectGrid'
                                label='Select a course format'
                            >
                                <Form.Select
                                    aria-label='Floating label select example'
                                    isValid={ !errors.course_format }
                                    isInvalid={ !!errors.course_format }
                                    { ...register('course_format') }
                                >
                                    <option>{ CourseFormatEnum.ONLINE }</option>
                                    <option>{ CourseFormatEnum.STATIC }</option>
                                    {
                                        errors.course_format &&
                                        <FormControlFeedbackError error={ errors.course_format.message } />
                                    }
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
                                label='Age'
                            >
                                <Form.Control
                                    type='number'
                                    placeholder='age'
                                    isValid={ !errors.age }
                                    isInvalid={ !!errors.age }
                                    { ...register('age') }
                                />
                                { errors.age && <FormControlFeedbackError error={ errors.age.message } /> }
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingSelectGrid'
                                label='Select a course type'
                            >
                                <Form.Select
                                    aria-label='Floating label select example'
                                    isValid={ !errors.course_type }
                                    isInvalid={ !!errors.course_type }
                                    { ...register('course_type') }
                                >
                                    <option>{ CourseTypeEnum.MINIMAL }</option>
                                    <option>{ CourseTypeEnum.PREMIUM }</option>
                                    <option>{ CourseTypeEnum.PRO }</option>
                                    <option>{ CourseTypeEnum.VIP }</option>
                                    <option>{ CourseTypeEnum.INCUBATOR }</option>
                                    { 
                                        errors.course_type && 
                                        <FormControlFeedbackError error={ errors.course_type.message } /> 
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                { 
                    errorsOrder?.messages && 
                    <Alert className='p-2' key='danger' variant='danger'>{ errorsOrder?.messages }</Alert> 
                }
                <Button
                    type='button'    
                    variant='secondary' 
                    onClick={ handleCloseForm }
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
    OrderForm3
};
