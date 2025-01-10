import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { FloatingLabel, Form } from 'react-bootstrap';

import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { FormControlFeedbackGood } from '../FormControlFeedbackGood/FormControlFeedbackGood';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IGroup } from '../../interfaces';
import { IFuncVoid } from '../../types';
import { groupActions } from '../../redux';
import { groupValidator } from '../../validators';

import css from './GroupForm.module.css';

const GroupForm: FC = () => {
    const dispatch = useAppDispatch();
    const { errorGroup } = useAppSelector(state => state.groupReducer);
    const { handleSubmit, register, reset, formState: { errors, isValid, touchedFields } } = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator),
    });
    const save: SubmitHandler<IGroup> = async (group: IGroup): Promise<void> => {
        await dispatch(groupActions.create({ group }));
        reset();
    };
    const select: IFuncVoid = (): void => {
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
                    isValid={ touchedFields.name && !errors.name }
                    isInvalid={ !!errors.name || !!errorGroup?.messages }
                    { ...register('name') }
                />
                { !errors.name && <FormControlFeedbackGood /> }
                { errors.name && <FormControlFeedbackError error={ errors.name.message } /> }
                { errorGroup?.messages && <FormControlFeedbackError error={ errorGroup?.messages } /> }
                <div className='d-flex'>
                    <button
                        type="submit"
                        className={ css.Button_group }
                        disabled={ !isValid }
                    >
                        save
                    </button>
                    <button
                        type="button"
                        className={ css.Button_group }
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
