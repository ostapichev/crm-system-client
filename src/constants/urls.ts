const oktenURL = 'https://owu.com.ua';
const baseURL = 'http://localhost:3500';
const auth = '/auth';
const orders = '/orders';
const groups = '/groups';
const comments = '/comments';
const admin = '/admin';

const urls = {
    adminAPI: {
        create: `${baseURL}${admin}`,
        getById: (id: number): string => `${baseURL}/${admin}/${id}`,
        banUser: (id: number): string => `${baseURL}/${admin}/ban/${id}`,
        unBanUser: (id: number): string => `${baseURL}/${admin}/unban/${id}`,
        statisticOrders: `${baseURL}${admin}/orders-statistic`,
        statisticUser: (id: number): string => `${baseURL}/users/statistic/${id}`,
    },
    usersAPI: {
        getUsers: `${baseURL}/users`,
    },
    authAPI: {
        signIn: `${baseURL}${auth}/sign-in`,
        me: `${baseURL}${auth}/me`,
        refresh: `${baseURL}${auth}/refresh`,
        logout: `${baseURL}${auth}/sign-out`,
    },
    ordersAPI: {
        orders: `${baseURL}${orders}`,
        getById: (id: number): string => `${baseURL}${orders}/${id}`,
        downloadExel: `${baseURL}${orders}/download`,
    },
    commentsAPI: {
        comments: (orderId: number): string => `${baseURL}${orders}${comments}/${orderId}`,
    },
    groupsAPI: {
        groups: `${baseURL}${groups}`,
    },
};

export {
    oktenURL,
    baseURL,
    urls,
};
