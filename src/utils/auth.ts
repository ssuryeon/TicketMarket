const BASE_URL = 'http://172.30.16.9:3000';

export const signUp = async (email:string, password:string, nickname:string) => {
    console.log(`signup start: ${email}, ${password}, ${nickname}`)
    const res = await (await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
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
    const res = await (await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        })
    })).json();
    console.log(res);
    return res;
}