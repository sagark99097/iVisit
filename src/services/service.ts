
import { POST, GET } from './baseService';

export const Api = {
    async login(email: string, password: string) {
        const response = await POST('https://reqres.in/api/login', {
            email,
            password,
        });
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    },
    async getUsers(limit: string) {
        const response = await GET(`https://dummyapi.io/data/api/user?limit=${limit}`);
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    },
    async getUserDetails(userId: string) {
        const response = await GET(`https://dummyapi.io/data/api/user/${userId}`);
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    }
}

