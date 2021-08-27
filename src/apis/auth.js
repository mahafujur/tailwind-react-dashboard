import {sendGetRequest, sendPostRequest, sendRequest} from "../libs/FetchApi";

export function login(data) {
    return sendRequest('POST', 'login', data,{});
}

export function refreshToken(data) {
    return sendPostRequest('/auth/refresh-tokens', data);
}

export function signup(data, referred) {
    if (referred) return sendPostRequest('/auth/register?referrerId=' + referred, data);
    else return sendPostRequest('/auth/register', data);
}

export function resetPass(data) {
    const token = data.token;
    delete data.token
    return sendPostRequest('/auth/reset-password?token=' + token, data);
}

export function forgotPass(data) {
    return sendPostRequest('/auth/forgot-password', data);
}


export function dashboard() {
    return sendGetRequest('dashboard', null);
}


export default {
    login,
    resetPass,
    forgotPass,
    refreshToken,
    dashboard,
}
