const schoolURL = process.env.REACT_APP_SCHOOL_URL;
const baseURL = process.env.REACT_APP_BASE_URL;
const clientURL = process.env.REACT_APP_CLIENT_URL;
const auth = '/auth';
const orders = '/orders';
const groups = '/groups';
const comments = '/comments';
const admin = '/admin';

const urls = {
    adminAPI: {
        create: `${baseURL}${admin}`,
        getActivateUser: (id: number): string => `${admin}/activate-user/${id}`,
        banUser: (id: number): string => `${admin}/ban/${id}`,
        unBanUser: (id: number): string => `${admin}/unban/${id}`,
        statisticOrders: `${admin}/orders-statistic`,
        statisticUser: (id: number): string => `/users/statistic/${id}`,
    },
    usersAPI: {
        getUsers: `${baseURL}/users`,
    },
    authAPI: {
        signIn: `${auth}/sign-in`,
        activateUser: (activateToken: string): string => `${auth}/activate/${activateToken}`,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`,
        logout: `${auth}/sign-out`,
    },
    ordersAPI: {
        orders: `${orders}`,
        getById: (id: number): string => `${orders}/${id}`,
        downloadExel: `${orders}/download`,
    },
    commentsAPI: {
        comments: (orderId: number): string => `${orders}${comments}/${orderId}`,
    },
    groupsAPI: {
        groups: `${groups}`,
    },
    localURL: {
        activate: `${clientURL}/activate`,
        recovery: `${clientURL}/recovery`,
    },
};

export {
    schoolURL,
    baseURL,
    urls,
};
