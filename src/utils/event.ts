const BASE_URL = 'https://greedy-grandpa-crabbing.ngrok-free.dev';

export const getEventList = async () => {
    console.log('getEventList start');
    const res = await (await fetch(`${BASE_URL}/event`, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true'
        }
    })).json();
    console.log(res);
    return res;
}

export const getEventDetail = async (id:number) => {
    console.log(`getEventDetail start: ${id}`);
    const res = await (await fetch(`${BASE_URL}/event/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true'
        },
    })).json();
    console.log(res);
    return res;
}

export const getSeats = async (id:string) => {
    console.log(`getSeats start: ${id}`);
    const res = await (await fetch(`${BASE_URL}/event/${id}/seats`, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true'
        },
    })).json();
    console.log(res);
    return res;
}