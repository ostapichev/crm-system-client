import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Form, Stack } from 'react-bootstrap';

import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { useAppDispatch } from '../../hooks';
import { IComment } from '../../interfaces';
import { commentActions } from '../../redux';
import { commentValidator } from '../../validators';

interface IProps {
    order_id: number;
    isOwner: boolean;
}

const CommentForm: FC<IProps> = ({ order_id, isOwner }) => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, setValue, formState: { errors, isValid } } = useForm<IComment>({
        mode: "all",
        resolver: joiResolver(commentValidator),
    });
    const save: SubmitHandler<IComment> = async (comment) => {
        await dispatch(commentActions.create({ order_id, comment }));
        setValue('text', '');
    };

    return (
        <Stack direction='horizontal' gap={1}>
            <Form onSubmit={handleSubmit(save)} className='w-50 mb-2 d-flex align-items-center'>
                <Form.Control
                    className='me-auto'
                    placeholder='Add comment'
                    disabled={ isOwner }
                    isInvalid={ !!errors.text }
                    { ...register('text') }
                />
                { errors.text && <FormControlFeedbackError error={ errors.text.message } /> }
                <Button type='submit' disabled={ !isValid || isOwner } variant='primary'>add</Button>
            </Form>
        </Stack>
    );
};

export {
    CommentForm
};