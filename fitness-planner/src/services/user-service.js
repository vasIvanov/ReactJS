const userService = {
    getUsers: function() {
        return fetch(`http://localhost:9999/api/user/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
    },

    register: function(data) {
        return fetch(`http://localhost:9999/api/user/register`,{
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json());
    },
    login: function(data) {
        return fetch(`http://localhost:9999/api/user/login`,{
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json().then(json => res.status === 200 ? json : Promise.reject(json)));
    },
    logout: function() {
        return fetch(`http://localhost:9999/api/user/logout`,{
            method: 'POST',
            credentials: 'include'
        }).then(res => res.text());
    },
    update: function(data) {
        return fetch(`http://localhost:9999/api/user/${data._id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.text());
    }
};

export default userService;