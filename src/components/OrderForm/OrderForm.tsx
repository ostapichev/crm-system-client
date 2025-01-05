import { ChangeEvent, FC, useEffect } from 'react';
import { SubmitHandler, useForm, } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";

import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { Group } from '../Group/Group';
import { GroupForm } from '../GroupForm/GroupForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { groupActions, orderActions } from '../../redux';
import { IFuncVoid } from '../../types';
import { orderValidator } from '../../validators';

import css from './OrderForm.module.css';

const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const { groups, groupTrigger, vision, errorGroup } = useAppSelector(state => state.groupReducer);
    const { orderUpdate, showOrderForm, errorsOrder } = useAppSelector(state => state.orderReducer);
    const { reset, handleSubmit, register, setValue, formState: { errors, isValid, touchedFields }} = useForm<IOrder>({
        mode: 'all',
        resolver: joiResolver(orderValidator),
    });
    const update: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.update({ id: orderUpdate.id, order }));
        reset();
    };
    const addGroup: IFuncVoid = () => {
        dispatch(groupActions.setVision(true));
    };
    const handleGroup = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(groupActions.setGroupCreate(event.target.value));
    };
    const handleCloseForm = () => {
        dispatch(orderActions.setCloseOrderForm());
        dispatch(groupActions.setVision(false));
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
        <Modal 
            size='lg' 
            show={ showOrderForm } 
            onHide={ handleCloseForm }
            backdrop='static'
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ handleSubmit(update) }>
            <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            {
                                vision &&
                                <div className={ css.group_form }>
                                    <GroupForm />
                                </div>
                            }
                            <FloatingLabel
                                className={ vision ? 'd-none' : 'd-flex flex-column' }
                                controlId='floatingSelectGrid'
                                label='Choice a group'
                            >
                                <Form.Select
                                    aria-label='Floating label select example'
                                    onChange={ handleGroup }
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
                                    isValid={ touchedFields.name }
                                    isInvalid={ !!errors.name }
                                    { ...register('name') }
                                />
                            </FloatingLabel>
                            {
                                !errorsOrder?.name &&
                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                            }
                            {
                                errorsOrder?.name &&
                                <Form.Control.Feedback type="invalid" tooltip>
                            { errorsOrder?.name[0] }
                        </Form.Control.Feedback>
                        }
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId='floatingInputGrid'
                                label='Sum'
                            >
                                <Form.Control
                                    type='text'
                                    placeholder='sum'
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
                                label='Already paid'
                            >
                                <Form.Control
                                    type='text'
                                    placeholder='already_paid'
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
