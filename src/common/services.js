export default {
    userAuth: function (login, password) {
        return fetch('http://localhost:8080/app/rest/v2/oauth/token', {
            method: "POST",
            headers: {
                "Authorization": "Basic Y2xpZW50MzE0OkhYYTM1VA==",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=password&username=" + login + '&password=' + password
        }).then((response) => {
            return response.text();
        }).then(function (user) {
            localStorage.setItem('token', JSON.parse(user).access_token);

        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    },

    getUserInfo: function () {
        return fetch('http://localhost:8080/app/rest/api/getUserInfo', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.text();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    },

    getAllDevice: function () {
        return fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device?view=device-with-all', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    },

    getAllRoles: function () {
        return fetch('http://localhost:8080/app/rest/v2/entities/sec$Role', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    },

    getAllTesting: function () {
        return fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Testing', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    },

    getAllOS: function () {
        return fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$OperationSystem', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    }
}

