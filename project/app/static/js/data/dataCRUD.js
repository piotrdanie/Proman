export let dataCRUD = {
    apiGet: async function (url) {
        let response = await fetch(url, {
            method: "GET",
        });
        // return await response.json();
        if (response.ok) {
            return await response.json();
        }
    },
    apiPost: async function (url, payload) {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(
                payload
            ),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    apiDelete: async function (url, payload) {
        try {
            let response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(
                payload
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
    
            if (response.ok) {
            console.log(`DELETE request to ${url} successful.`);
            } else {
            console.error(`DELETE request to ${url} failed with status ${response.status}.`);
            }
        } catch (error) {
            console.error(`An error occurred while making DELETE request to ${url}:`, error);
        }   
    },
    apiPut: async function (url) {
        // function for send PUT request at specified endpoint in url
    },
    apiPatch: async function (url) {
        // function for sending PATCH request at specified endpoint in url
    },
}