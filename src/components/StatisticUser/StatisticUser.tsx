import { AxiosError } from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';

import { Badge, Card } from 'react-bootstrap';

import { adminPanelService } from '../../services';
import { IFuncVoid } from '../../types';
import { IStatisticOrders } from '../../interfaces';

interface IProps {
    id: number;
}

const StatisticUser: FC<IProps> = ({ id }) => {
    const [userStatistic, setUserStatistic] = useState<IStatisticOrders>({
        orders: 0,
        in_work: 0,
        agree: 0,
        disagree: 0,
        dubbing: 0
    });
    const { orders, in_work, agree, disagree, dubbing } = userStatistic;
    const queryUserStatistic: IFuncVoid = useMemo(() => async () => {
        try {
            const { data } = await adminPanelService.getStatisticUser(id);
            setUserStatistic(data);
        } catch (e) {
            const err = e as AxiosError;
            alert(err);
        }
    }, [id]);
    useEffect(() => {
        queryUserStatistic();
    }, [queryUserStatistic]);

    return (
        <div className='w-100'>
            <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-start'>
                <strong>total&#58;&nbsp;</strong>
                <Badge bg='success' pill>
                    { orders }
                </Badge>
            </Card.Text>
            {
                in_work > 0 &&
                <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-start'>
                    <strong>in work&#58;&nbsp;</strong>
                    <Badge bg='primary' pill>
                        { in_work }
                    </Badge>
                </Card.Text>
            }
            {
                agree > 0 &&
                <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-start'>
                    <strong>agree&#58;&nbsp;</strong>
                    <Badge bg='primary' pill>
                        { agree }
                    </Badge>
                </Card.Text>
            }
            {
                disagree > 0 &&
                <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-start'>
                    <strong>disagree&#58;&nbsp;</strong>
                    <Badge bg='primary' pill>
                        { disagree }
                    </Badge>
                </Card.Text>
            }
            {
                dubbing > 0 &&
                <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-start'>
                    <strong>dubbing&#58;&nbsp;</strong>
                    <Badge bg='primary' pill>
                        { dubbing }
                    </Badge>
                </Card.Text>
            }
        </div>
    );
};

export {
    StatisticUser
};