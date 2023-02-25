import axios from 'axios';

const commonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

// Register interceptor
axios.interceptors.response.use(
    (response) => {
        // Do something before request is sent
        return response;
    },
    (error) => {
        //handle error
        return Promise.reject(error);
    },
);


export const GET = async (url: string, params?: { [name: string]: string }) => {
    return new Promise(function (resolve, reject) {
        axios({
            params,
            method: 'get',
            url: url,
            headers: {
                ...commonHeaders,
                'app-id': '600c4c7e43aa981852b532ef'
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

export const POST = async (
    url: string,
    data: any,
) => {
    return new Promise(function (resolve, reject) {
        axios({
            data,
            method: 'post',
            url: url,
            headers: {
                ...commonHeaders,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};
