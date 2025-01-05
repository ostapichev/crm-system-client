import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { FloatingLabel, Form } from 'react-bootstrap';

import { useAppDispatch } from '../../hooks';
import { IGroup } from '../../interfaces';
import { IFuncVoid } from '../../types';
import { groupActions } from '../../redux';
import { groupValidator } from '../../validators';

import css from './GroupForm.module.css';

const GroupForm: FC = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator),
    });
    const save: SubmitHandler<IGroup> = async (group: IGroup) => {
        await dispatch(groupActions.create({ group }));
        reset();
    };
    const select: IFuncVoid = () => {
        dispatch(groupActions.setVision(false));
    };

    return (
        <Form onSubmit={ handleSubmit(save) }>
            <FloatingLabel
                controlId='floatingInputGrid'
                label='Group name'
            >
                <Form.Control
                    type='text'
                    placeholder='enter group name'
                    { ...register('name') }
                />
                <div className='d-flex'>
                    <button
                        type="submit"
                        className={ css.Btn_group }
                        disabled={ !isValid }
                    >
                        save
                    </button>
                    <button
                        type="button"
                        className={ css.Btn_group }
                        onClick={ select }
                    >
                        select
                    </button>
                </div>
            </FloatingLabel>
        </Form>
    );
};

export {
    GroupForm
};
