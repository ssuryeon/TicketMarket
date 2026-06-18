const BASE_URL = 'https://greedy-grandpa-crabbing.ngrok-free.dev';

export const getMarketList = async (token:string) => {
    console.log('getMarketList start');
    const res = await (await fetch(`${BASE_URL}/market`, {
        method: 'GET',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    console.log(res);
    return res;
}

export const registerMarket = async (tokenId:number, price:number, token:string) => {
    console.log(`registerMarket start: ${tokenId}, ${price}`);
    const res = await (await fetch(`${BASE_URL}/market/list`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            tokenId,
            price,
        })
    })).json();
    console.log(res);
    return res;
}

export const buyMarket = async (listingId:string, token:string) => {
    console.log('buyMarket start');
    const res = await (await fetch(`${BASE_URL}/market/buy/${listingId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    console.log(res);
    return res;
}

export const cancelMarket = async (listingId:string, token:string) => {
    console.log('cancelMarket start');
    const res = await (await fetch(`${BASE_URL}/market/cancel/${listingId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    console.log(res);
    return res;
}