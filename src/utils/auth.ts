const BASE_URL = 'https://greedy-grandpa-crabbing.ngrok-free.dev';

export const signUp = async (email:string, password:string, nickname:string) => {
    console.log(`signup start: ${email}, ${password}, ${nickname}`)
    const res = await (await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
            email,
            password,
            nickname,
        })
    })).json();
    console.log(res);
    return res;
}

export const logIn = async (email:string, password:string) => {
    console.log(`logIn start: ${email}, ${password}`)
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
            email,
            password,
        })
    });
    console.log(res.status);
    const res2 = await res.json();
    return res2;
}

export const me = async (token:string) => {
    console.log(`me start: ${token}`);
    const res = await (await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    console.log(res);
    return res;
}

export const registerAccount = async (bank_name:string, bank_account:string, bank_holder:string, token:string) => {
    console.log(`registerAccount start: ${bank_name}, ${bank_account}, ${bank_holder}`)
    const res = await (await fetch(`${BASE_URL}/auth/bank`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            bank_name,
            bank_account,
            bank_holder,
        })
    })).json();
    console.log(res);
    return res;
}

export const withdrawAccount = async () => {
    console.log('withdrawAccount start');
    const res = await (await fetch(`${BASE_URL}/auth/withdraw`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    })).json();
    console.log(res);
    return res;
}

export const getRank = async (token:string) => {
    console.log(`getRank start: ${token}`);
    const res = await (await fetch(`${BASE_URL}/fan-nft/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        }
    })).json();
    console.log(res);
    return res;
}