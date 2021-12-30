import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const login = (email, password) => {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

const logout = () => {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

const getAll = () => {
    return fetchWrapper.get(baseUrl);
}

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    getAll
};