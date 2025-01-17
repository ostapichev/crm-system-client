import { FC } from 'react';

import { Col, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';

import { ButtonBlock } from "../ButtonBlock/ButtonBlock";
import { CourseEnum, CourseFormatEnum, CourseTypeEnum, StatusEnum } from '../../enums';
import { Group } from '../Group/Group';
import { useAppSelector } from '../../hooks';

const FilterBlock: FC = () => {
    const { groups } = useAppSelector(state => state.groupReducer);

    return (
        <div className='d-flex justify-content-between bg-success-subtle'>
            <Stack style={{ width: '90%'}}>
                <Row lg={6}>
                    <Col className='pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Name'
                        >
                            <Form.Control
                                type='text'
                                placeholder='name'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course format'
                        >
                            <Form.Select
                                aria-label='Floating label select example'
                                style={{ cursor: 'pointer' }}
                            >
                                <option>All formats</option>
                                <option>{ CourseFormatEnum.ONLINE }</option>
                                <option>{ CourseFormatEnum.STATIC }</option>
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
                                type='text'
                                placeholder='surname'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course type'
                        >
                            <Form.Select
                                aria-label='Floating label select example'
                            >
                                <option>All types</option>
                                <option>{ CourseTypeEnum.PRO }</option>
                                <option>{ CourseTypeEnum.VIP }</option>
                                <option>{ CourseTypeEnum.MINIMAL }</option>
                                <option>{ CourseTypeEnum.INCUBATOR }</option>
                                <option>{ CourseTypeEnum.PREMIUM }</option>
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
                                type='text'
                                placeholder='email'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mb-2 m-2'
                            controlId='floatingSelectGrid'
                            label='Status'
                        >
                            <Form.Select
                                aria-label='Floating label select example'
                            >
                                <option>All statuses</option>
                                <option>{ StatusEnum.NEW }</option>
                                <option>{ StatusEnum.IN_WORK }</option>
                                <option>{ StatusEnum.AGREE }</option>
                                <option>{ StatusEnum.DISAGREE }</option>
                                <option>{ StatusEnum.DUBBING }</option>
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
                                type='text'
                                placeholder='phone'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='mb-2 m-2'
                            controlId='floatingSelectGrid'
                            label='Group'
                        >
                            <Form.Select
                                aria-label='Floating label select example'
                            >
                                <option>All groups</option>
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
                                type='number'
                                placeholder='age'
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Created after'
                        >
                            <Form.Control
                                type='date'
                                placeholder='created_after'
                            />
                        </FloatingLabel>
                    </Col>
                    <Col className='ps-0 pe-2'>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingSelectGrid'
                            label='Course format'
                        >
                            <Form.Select
                                aria-label='Floating label select example'
                            >
                                <option>All courses</option>
                                <option>{ CourseEnum.JCX }</option>
                                <option>{ CourseEnum.FE }</option>
                                <option>{ CourseEnum.PCX }</option>
                                <option>{ CourseEnum.FS }</option>
                                <option>{ CourseEnum.JSCX }</option>
                                <option>{ CourseEnum.QACX }</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            className='m-2'
                            controlId='floatingInputGrid'
                            label='Created before'
                        >
                            <Form.Control
                                type='date'
                                placeholder='created_before'
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
