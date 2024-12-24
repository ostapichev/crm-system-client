const oktenURL = 'https://owu.com.ua';
const baseURL = 'http://localhost:3500';
const auth = '/auth';
const orders = '/orders';
const admin = '/admin';

const urls = {
    adminAPI: {
        create: `${baseURL}${admin}/create`,
        getAllUsers: `${baseURL}${admin}`,
        getById: (userId: number): string => `${baseURL}/${admin}/${userId}`,
        banUser: (userId: number): string => `${baseURL}/${admin}/ban/${userId}`,
        unBanUser: (userId: number): string => `${baseURL}/${admin}/unban/${userId}`,
    },
    authAPI: {
        signIn: `${baseURL}${auth}/sign-in`,
        me: `${baseURL}${auth}/me`,
        refresh: `${baseURL}${auth}/refresh`,
        logout: `${baseURL}${auth}/sign-out`,
    },
    commentsAPI: {
        create: (orderId: number) => `${baseURL}${orders}/${orderId}`,
    },
    ordersAPI: {
        getAllOrders: `${baseURL}${orders}`,
        getById: (orderId: number): string => `${baseURL}${orders}/${orderId}`,
    },
    groupsAPI: {
        groups: `${baseURL}/groups`,
    },
};

export {
    oktenURL,
    baseURL,
    urls,
};
