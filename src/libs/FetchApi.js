import axios from "axios";
import {BASE_URL} from "../auth/baseUrl";
import UserManager from "../auth/UserManager";
import Swal from "sweetalert2";

const defaultOptions = {
    credential: false,
    contentType: 'application/json',
};

export async function sendRequest(method, url, data, options) {
    const headers = {};
    headers['Content-Type'] = options.contentType || defaultOptions.contentType;
    headers['Authorization'] = 'Bearer ' + UserManager.getToken();
    try {
        const res = await axios({
            baseURL: BASE_URL,
            url: url,
            method: method,
            headers: headers,
            data,
        });
        return {
            ok: true,
            data: res.data,
            headers: res.headers,
        };
    } catch (err) {
        return {
            ok: false,
            data: err.response && err.response.data ? err.response.data : null,
            err: err,
        };
    }
}

export function sendPostRequest(url, data, options = {}) {

    // return sendRequest('POST', url, data, options);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (options.credential) {
        myHeaders.append('Authorization', 'Bearer ' + UserManager.getToken());
    }

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
    };

    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            return res.json().then(data => {
                if (res.ok) {
                    return {ok: true, data};
                } else {
                    return {ok: false, err: res, data};
                }
            })
        });
}

export function sendDeleteRequest(url, data, options = {}) {
    // return sendRequest('DELETE', url, data, options);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (options.credential) {
        myHeaders.append('Authorization', 'Bearer ' + UserManager.getToken());
    }

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
    };

    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            if (res.ok) {
                return {ok: true, data};
            } else {
                return {ok: false, err: res};
            }
        });
}

export function sendPutRequest(url, data, options = {}) {
    // return sendRequest('PUT', url, data, options);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (options.credential) {
        myHeaders.append("Authorization", "Bearer " + UserManager.getToken());
    }

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
    };

    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            return res.json().then(data => {
                if (res.ok) {
                    return {ok: true, data};
                } else {
                    return {ok: false, err: res, data};
                }
            })
        });
}

export  function sendGetRequest(url, data, options = {}) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + UserManager.getToken());
    let requestOptions = {};
    if (data !== "none") requestOptions.body = data;
    requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            return res.json().then(data => {
                if (res.ok) {
                    return {ok: true, data};
                }
                else {
                    if(res.status===401) {
                        UserManager.removeLoggedInUser()
                        window.location.href="/login"
                     // refreshToken('refresh').then(response => {
                     //      console.log(response.data.access_token)
                     //
                     //  }).catch(err => {
                     //      console.log(err)
                     //  })

                    }

                    else return {ok: false, err: res, data};
                }
            })
        });
}

export function postMultipartRequest(url, formData, options = {}) {
    options.multipart = true;
    // return sendRequest('POST', url, formData, options);

    const myHeaders = new Headers();

    if (options.credential) {
        myHeaders.append('Authorization', 'Bearer ' + UserManager.getToken());
    }

    let requestOptions = {};

    if (formData !== "none") requestOptions.body = formData;

    requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
    };

    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            return res.json().then(data => {
                if (res.ok) {
                    return {ok: true, data};
                } else {
                    return {ok: false, err: res, data};
                }
            })
        });
}


export async function refreshToken(url) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzAwOTA1OTgsIm5iZiI6MTYzMDA5MDU5OCwianRpIjoiMzIzZWQ0M2ItN2I3Yy00YjhkLTljNTMtZDE4Y2Y1ZGQ3NjQzIiwiZXhwIjoxNjMyNjgyNTk4LCJpZGVudGl0eSI6ImZyZWRkeSIsInR5cGUiOiJyZWZyZXNoIn0.XnvQFXP91v4y1qGR0kyTpNpP1bCBOezarp-_DvLDSfM');

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
    };
    return fetch(`${BASE_URL}${url}`, requestOptions)
        .then(res => {
            return res.json().then(data => {
                if (res.ok) {
                    return {ok: true, data};
                } else {
                    return {ok: false, err: res, data};
                }
            })
        });

}