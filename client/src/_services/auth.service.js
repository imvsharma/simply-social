import createUserMutation from '../mutations/createUserMutation';
import loginMutation from '../mutations/loginMutation';

export default class Auth {
    apiURL = 'http://localhost:5000/api/v1/user';

    

    signup = data => {
        /* const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }; */

        return new Promise((resolve, reject) => {
            createUserMutation(data).then(user => {
                console.log(user);
                resolve(user)
            }).catch(err => {
                console.log('error', err)
            })
            /* fetch(`${this.apiURL}/signup`, requestOptions)
                .then(this.handleResponse)
                .then(user => {
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                }) */
        })
    }

    login = data => {
        /* const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }; */

        return new Promise((resolve, reject) => {
            loginMutation(data).then(user => {
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user.login.token));
                resolve(user.login)
            }).catch(err => {
                console.log('error', err)
            })
            /* fetch(`${this.apiURL}/login`, requestOptions)
                .then(this.handleResponse)
                .then(user => {
                    console.log('user')
                    localStorage.setItem('user', JSON.stringify(user.token));
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                }) */
        })
    }

    logout = () => {
        localStorage.removeItem('user')
    }

    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}