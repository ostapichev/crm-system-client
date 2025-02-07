import { FC } from 'react';

import { Alert, Button, Image, Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { adminPanelActions } from "../../redux";

import { okten_school_image } from '../../assets';
import {IFuncVoid} from "../../types";

const FeedbackActivation: FC = () => {
    const dispatch = useAppDispatch();
    const { activateUser, errorUser } = useAppSelector(state => state.adminPanelReducer);
    const { message } = activateUser;
    const handleCloseFeedback: IFuncVoid = (): void => {
        dispatch(adminPanelActions.setCloseFeedbackActivation());
    };

    return (
        <Modal
            show={ !!activateUser?.message || !!errorUser?.messages }
            onHide={ handleCloseFeedback }
            backdrop='static'
            keyboard={ false }
            centered
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                <Alert variant={ !!message ? 'success' : 'danger' }>
                    { message || errorUser?.messages }
                </Alert>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                <Button variant='secondary' onClick={ handleCloseFeedback }>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    FeedbackActivation
};
