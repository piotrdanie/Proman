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
        const jsonResponse = await response.json();
        return jsonResponse;
    },
    apiDelete: async function (url) {
        try {
            let response = await fetch(url, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error(`An error occurred while making DELETE request to ${url}:`, error);
        }   
    },

    apiPut: async function (url, payload) {
        try {
            let response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(`An error occurred while making PUT request to ${url}:`, error);
        }
    },

    apiPatch: async function (url, payload) {
        try {
            let response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(`An error occurred while making PATCH request to ${url}:`, error);
        }
    },
}
