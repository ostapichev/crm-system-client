import _ from 'lodash';

import { IPagination } from '../interfaces';
import { IPaginateButtons } from '../types';

const paginationRangeUtil = (dataPagination: IPagination): IPaginateButtons => {
    const { page, totalPages, siblings } = dataPagination;
    let totalPageNoInArray = 7 + siblings;
    if (totalPageNoInArray >= totalPages) {
        return _.range(1, totalPages + 1);
    }
    let leftSibLingsIndex = Math.max(page - siblings, 1);
    let rightSibLingsIndex = Math.min(page + siblings, totalPages);
    let showLeftDots = leftSibLingsIndex > 2;
    let showRightDots = rightSibLingsIndex < totalPages - 2;
    if (showRightDots && !showLeftDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = _.range(1, leftItemsCount + 1);
        return [...leftRange, ' ...', totalPages];
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = _.range(totalPages - rightItemsCount + 1, totalPages + 1);
        return [1, '... ', ...rightRange];
    } else {
        let middleRange = _.range(leftSibLingsIndex, rightSibLingsIndex + 1);
        return [1, '... ', ...middleRange, ' ...', totalPages];
    }
};

export {
    paginationRangeUtil
};
