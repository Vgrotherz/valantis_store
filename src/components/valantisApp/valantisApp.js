import md5 from 'md5';
const apiUrl = 'http://api.valantis.store:40000/';
const apiPassword = 'Valantis';
const retryTime = 1000; // время после которого будет повтор получения данных

export const getDataFromApi = async (action, params, retryCount = 0) => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body:JSON.stringify({
                action,
                params
            }),
            headers: {
                "Content-type" : "application/json",
                "X-Auth" : md5(`${apiPassword}_${timestamp}`)
            }
        });

        if(!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error making API request:", error);

        await new Promise(resolve => setTimeout(resolve, retryTime));
        return getDataFromApi(action, params, retryCount + 1);
        // throw error;
    }
}