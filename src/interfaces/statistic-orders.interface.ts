interface IStatistic {
    orders?: number;
    agree?: number,
    in_work?: number;
    disagree?: number,
    dubbing?: number;
}

export interface IStatisticOrders extends IStatistic {
    users?: number;
    news?: number;
    status_null?: number;
}

export interface IStatisticUser extends IStatistic {}
