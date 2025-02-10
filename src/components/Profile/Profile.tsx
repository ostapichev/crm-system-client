import { FC, useEffect } from 'react';

import { Badge, Card, Dropdown, Image, ListGroup } from 'react-bootstrap';

import { DateFormat } from '../DateFormat/DateFormat';
import { StatusEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IUser } from '../../interfaces';
import { adminPanelActions } from '../../redux';

import { okten_school_image } from '../../assets';

interface IProps {
    me: IUser;
}

const Profile: FC<IProps> = ({ me }) => {
    const dispatch = useAppDispatch();
    const { userStatistic } = useAppSelector(state => state.adminPanelReducer);
    const { orderTrigger } = useAppSelector(state => state.orderReducer);
    const { commentTrigger } = useAppSelector(state => state.commentReducer);
    const { id, name, surname, email, role, created_at } = me;
    const { orders, in_work, agree, disagree, dubbing } = userStatistic;
    useEffect(() => {
        dispatch(adminPanelActions.getStatisticUser({ id }));
    }, [dispatch, orderTrigger, commentTrigger, id]);

    return (
        <Dropdown.ItemText className='p-1 bg-info-subtle'>
            <Image src={ okten_school_image } className='w-25 ms-2 mb-2' alt='okten-school' />
            <Card style={{ width: '20rem' }}>
                <Card.Header className='fw-bold fs-5'>
                    User&#58;&nbsp;&#35;{ id }&nbsp;{ role }
                </Card.Header>
                <ListGroup variant='flush'>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >surname&#58;
                        <strong>{ surname }</strong>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >name&#58;
                        <strong>{ name }</strong>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >email&#58;
                        <strong>{ email }</strong>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >created&nbsp;at&#58;
                        <strong>{ <DateFormat originalDate={ created_at } /> }</strong>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <Card.Header className='fw-bold fs-5'>Orders&#58;</Card.Header>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>total&nbsp;orders&#58;</div>
                        </div>
                        <Badge bg='success' pill>
                            { orders }
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>{ StatusEnum.IN_WORK }&#58;</div>
                        </div>
                        <Badge bg='primary' pill>
                            { in_work }
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>{ StatusEnum.AGREE }&#58;</div>
                        </div>
                        <Badge bg='primary' pill>
                            { agree }
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>{ StatusEnum.DISAGREE }&#58;</div>
                        </div>
                        <Badge bg='primary' pill>
                            { disagree }
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='d-flex justify-content-between align-items-start'
                    >
                        <div className='ms-2 me-auto'>
                            <div className="fw-bold">{ StatusEnum.DUBBING }&#58;</div>
                        </div>
                        <Badge bg='primary' pill>
                            { dubbing }
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Dropdown.ItemText>
    );
};

export {
    Profile
};
