import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert, Button, Col, Container, FloatingLabel, Form, Image, Modal, Row } from 'react-bootstrap';

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { Group } from '../Group/Group';
import { GroupForm } from '../GroupForm/GroupForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { groupActions, orderActions } from '../../redux';
import { IFuncVoid, IFuncOrderOrder } from '../../types';

import { okten_school_image } from '../../assets';
import css from './OrderForm.module.css';

const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const { groups, vision } = useAppSelector(state => state.groupReducer);
    const { orderUpdate, showOrderForm, errorsOrder } = useAppSelector(state => state.orderReducer);
    const { reset, handleSubmit, register, setValue, getValues } = useForm<IOrder>();
    const getFilterUpdateFields: IFuncOrderOrder = (order: IOrder): IOrder => {
        return Object.fromEntries(
            Object.entries(order).filter(([_, value]) => value !== null && value !== '' && value !== 0)
        );
    };
    const update: SubmitHandler<IOrder> = async (): Promise<void> => {
        const orderFiltered: IOrder = getFilterUpdateFields(getValues());
        const { meta: { requestStatus } } = await dispatch(
            orderActions.update({ id: orderUpdate.id, order: orderFiltered })
        );
        if (requestStatus === 'fulfilled') reset();
    };
    const save: SubmitHandler<IOrder> = async (order: IOrder): Promise<void> => {
        dispatch(orderActions.create({ order }));
        reset();
    }; 
    const addGroup: IFuncVoid = (): void => {
        dispatch(groupActions.setVision(true));
    };
    const handleCloseForm: IFuncVoid = (): void => {
        dispatch(orderActions.setCloseOrderForm());
        dispatch(groupActions.setVision(false));
        reset();
    };
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
        } else {
            setValue('status', StatusEnum.NEW);
        }
    }, [orderUpdate, setValue]);

    return (
        <Modal
            size='lg'
            show={ showOrderForm }
            onHide={ handleCloseForm }
            backdrop='static'
            keyboard={ false }
            centered
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
            </Modal.Header>
            <div className={ vision ? css.Group_form : 'd-none' }>
                <GroupForm />
            </div>
            <Form onSubmit={ handleSubmit(orderUpdate ? update : save) }>
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
                                        { ...register('status') }
                                    >
                                        <option>{ StatusEnum.NEW }</option>
                                        <option disabled={ !orderUpdate }>{ StatusEnum.IN_WORK }</option>
                                        <option disabled={ !orderUpdate }>{ StatusEnum.AGREE }</option>
                                        <option disabled={ !orderUpdate }>{ StatusEnum.DISAGREE }</option>
                                        <option disabled={ !orderUpdate }>{ StatusEnum.DUBBING }</option>
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
                                        { ...register('surname') }
                                    />
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
                                        { ...register('alreadyPaid') }
                                    />
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
                                        { ...register('email') }
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingSelectGrid'
                                    label='Select a course'
                                >
                                    <Form.Select
                                        aria-label='Floating label select example'
                                        { ...register('course') }
                                    >
                                        <option>{ CourseEnum.FE }</option>
                                        <option>{ CourseEnum.FS }</option>
                                        <option>{ CourseEnum.JCX }</option>
                                        <option>{ CourseEnum.QACX }</option>
                                        <option>{ CourseEnum.PCX }</option>
                                        <option>{ CourseEnum.JSCX }</option>
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
                                        { ...register('phone') }
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingSelectGrid'
                                    label='Select a course format'
                                >
                                    <Form.Select
                                        aria-label='Floating label select example'
                                        { ...register('course_format') }
                                    >
                                        <option>{ CourseFormatEnum.ONLINE }</option>
                                        <option>{ CourseFormatEnum.STATIC }</option>
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
                                        { ...register('age') }
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel
                                    controlId='floatingSelectGrid'
                                    label='Select a course type'
                                >
                                    <Form.Select
                                        aria-label='Floating label select example'
                                        { ...register('course_type') }
                                    >
                                        <option>{ CourseTypeEnum.MINIMAL }</option>
                                        <option>{ CourseTypeEnum.PREMIUM }</option>
                                        <option>{ CourseTypeEnum.PRO }</option>
                                        <option>{ CourseTypeEnum.VIP }</option>
                                        <option>{ CourseTypeEnum.INCUBATOR }</option>
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
                    >
                        { !!orderUpdate ? 'Save changes' : 'Create order' }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export {
    OrderForm
};
