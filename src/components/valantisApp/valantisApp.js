import md5 from 'md5';
const apiUrl = 'http://api.valantis.store:40000/';
const apiPassword = 'Valantis';


export const getDataFromApi = async (action, params) => {
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
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error making API request:", error);
        throw error;
    }
}