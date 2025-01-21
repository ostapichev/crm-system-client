import { ChangeEvent, FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Col, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';

import { ButtonBlock } from "../ButtonBlock/ButtonBlock";
import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { Group } from '../Group/Group';
import { useAppSelector } from '../../hooks';
import { IEventType, IFuncEventInputVoid, IFuncEventSelectInputElement, IFuncEventSelectVoid } from '../../types';

const FilterBlock: FC = () => {
    const { groups } = useAppSelector(state => state.groupReducer);
    const [query, setQuery] = useSearchParams();
    const inputData: IFuncEventSelectInputElement = (event: IEventType, param: string ): void => {
        query.set('page', '1');
        query.set(param, event?.target.value);
        if (!event.target.value) {
            query.delete(param);
        }
        setQuery(query);
    };
    const inputName: IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'name' );
    };
    const inputSurname: IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'surname');
    };
    const inputEmail: IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'email');
    };
    const inputPhone: IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'phone');
    };
    const inputAge: IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'age');
    };
    const selectCourse: IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>): void => {
        inputData(event, 'course');
    };
    const selectCourseFormat: IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>): void => {
        inputData(event, 'course_format');
    };
    const selectCourseType: IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>): void => {
        inputData(event, 'course_type');
    };
    const selectStatus: IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>): void => {
        inputData(event, 'status');
    };
    const selectGroup: IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>): void => {
        inputData(event, 'group');
    };
    const selectCreatedAfter: IFuncEventInputVoid  = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'created_after');
    };
    const selectCreatedBefore: IFuncEventInputVoid  = (event: ChangeEvent<HTMLInputElement>): void => {
        inputData(event, 'created_before');
    };

    return (
        <div className='d-flex justify-content-between bg-success-subtle'>
            <Stack style={{ width: '90%' }}>
                <Row lg={6}>
                    <Col className='pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Name'
                        >
                            <Form.Control
                                value={ query.get('name') || '' }
                                type='text'
                                placeholder='name'
                                onChange={ inputName }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course format'
                        >
                            <Form.Select
                                value={ query.get('course_format') || '' }
                                aria-label='Floating label select example'
                                onChange={ selectCourseFormat }
                            >
                                <option value=''>All formats</option>
                                <option value={ CourseFormatEnum.ONLINE }>{ CourseFormatEnum.ONLINE }</option>
                                <option value={ CourseFormatEnum.STATIC }>{ CourseFormatEnum.STATIC }</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Surname'
                        >
                            <Form.Control
                                value={ query.get('surname') || '' }
                                type='text'
                                placeholder='surname'
                                onChange={ inputSurname }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course type'
                        >
                            <Form.Select
                                value={ query.get('course_type') || '' }
                                aria-label='Floating label select example'
                                onChange={ selectCourseType }
                            >
                                <option value=''>All types</option>
                                <option value={ CourseTypeEnum.PRO }>{ CourseTypeEnum.PRO }</option>
                                <option value={ CourseTypeEnum.VIP }>{ CourseTypeEnum.VIP }</option>
                                <option value={ CourseTypeEnum.MINIMAL }>{ CourseTypeEnum.MINIMAL }</option>
                                <option value={ CourseTypeEnum.INCUBATOR }>{ CourseTypeEnum.INCUBATOR }</option>
                                <option value={ CourseTypeEnum.PREMIUM }>{ CourseTypeEnum.PREMIUM }</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Email'
                        >
                            <Form.Control
                                value={ query.get('email') || '' }
                                type='text'
                                placeholder='email'
                                onChange={ inputEmail }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mb-2 m-2'
                            controlId='floatingSelectGrid'
                            label='Status'
                        >
                            <Form.Select
                                value={ query.get('status') || '' }
                                aria-label='Floating label select example'
                                onChange={ selectStatus }
                            >
                                <option value=''>All statuses</option>
                                <option value={ StatusEnum.NEW }>{ StatusEnum.NEW }</option>
                                <option value={ StatusEnum.IN_WORK }>{ StatusEnum.IN_WORK }</option>
                                <option value={ StatusEnum.AGREE }>{ StatusEnum.AGREE }</option>
                                <option value={ StatusEnum.DISAGREE }>{ StatusEnum.DISAGREE }</option>
                                <option value={ StatusEnum.DUBBING }>{ StatusEnum.DUBBING }</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Phone'
                        >
                            <Form.Control
                                value={ query.get('phone') || '' }
                                type='text'
                                placeholder='phone'
                                onChange={ inputPhone }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mb-2 m-2'
                            controlId='floatingSelectGrid'
                            label='Group'
                        >
                            <Form.Select
                                value={ query.get('group') || '' }
                                aria-label='Floating label select example'
                                onChange={ selectGroup }
                            >
                                <option value=''>All groups</option>
                                {
                                    groups.map(group =>
                                        <Group
                                            key={ group.id }
                                            group={ group }
                                        />)
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Age'
                        >
                            <Form.Control
                                value={ query.get('age') || '' }
                                type='number'
                                placeholder='age'
                                onChange={ inputAge }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Created after'
                        >
                            <Form.Control
                                value={ query.get('created_after') || '' }
                                type='date'
                                placeholder='created_after'
                                onChange={ selectCreatedAfter }
                            />
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course'
                        >
                            <Form.Select
                                value={ query.get('course') || '' }
                                aria-label='Floating label select example'
                                onChange={ selectCourse }
                            >
                                <option value=''>All courses</option>
                                <option value={ CourseEnum.JCX }>{ CourseEnum.JCX }</option>
                                <option value={ CourseEnum.FE } >{ CourseEnum.FE }</option>
                                <option value={ CourseEnum.PCX }>{ CourseEnum.PCX }</option>
                                <option value={ CourseEnum.FS }>{ CourseEnum.FS }</option>
                                <option value={ CourseEnum.JSCX}>{ CourseEnum.JSCX }</option>
                                <option value={ CourseEnum.QACX }>{ CourseEnum.QACX }</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Created before'
                        >
                            <Form.Control
                                value={ query.get('created_before') || '' }
                                type='date'
                                placeholder='created_before'
                                onChange={ selectCreatedBefore }
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Stack>
            <ButtonBlock />
        </div>
    );
};

export {
    FilterBlock
};
