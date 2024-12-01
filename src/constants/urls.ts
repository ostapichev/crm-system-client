const baseURL = 'http://localhost:3500';
const auth = '/auth';
const orders = '/orders';
const groups = '/groups';
const admin = '/admin';

const urls = {
    adminAPI: {
        create: `${baseURL}/${admin}/create`,
        getAllUsers: `${baseURL}/${admin}`,
        getById: (id: number): string => `${baseURL}/${admin}/${id}`,
        banUser: (id: number): string => `${baseURL}/${admin}/ban/${id}`,
        unBanUser: (id: number): string => `${baseURL}/${admin}/unban/${id}`,
    },
    authAPI: {
        signIn: `${baseURL}/${auth}/sign-in`,
        me: `${baseURL}/${auth}/me`,
        refresh: `${baseURL}/${auth}/refresh`,
        logout: `${baseURL}/${auth}/sign-out`,
    },
    ordersAPI: {
        getAllOrders: `${baseURL}/${orders}`,
        getById: (id: number): string => `${baseURL}/${orders}/${id}`,
    },
    groupsAPI: {
        groups: `${baseURL}/${groups}`,
    },
};

export {
    baseURL,
    urls,
};
