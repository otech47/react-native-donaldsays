import { API_ROOT, GRAPH_API_ROOT, COINBASE_API_ROOT } from '../constants';

export default {
    get(route) {
        return fetch(API_ROOT + route, {
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log('api.get', json);
                if (json.status === 'success' && json.payload) {
                    return json.payload;
                }
            })
            .catch(err => { throw err; });
    },

    post(route, data) {
        return fetch(API_ROOT + route, {
            method: 'POST',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                console.log('api.post', json);
                if (json.status === 'success' && json.payload) {
                    return json.payload;
                }
            })
            .catch(err => { throw err; });
    },
    graph(query) {
        return fetch(GRAPH_API_ROOT, {
            method: 'POST',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json && json.errors) {
                    throw json.errors;
                } else if (json && json.data) {
                    console.log('api.graph: ', json.data);
                    return json.data;
                } else {
                    throw 'network error';
                }
            });
    },
    getExt(route) {
        console.log(route);

        return (
            fetch(route, {
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => 
                res.json()
                
            )
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => console.error(err))
        )
    }
}