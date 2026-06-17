const BASE_URL = 'https://greedy-grandpa-crabbing.ngrok-free.dev';

export const purchaseTicket = async (eventId:string, seatId:string, token:string) => {
    console.log(`purchaseTicket start: ${eventId}, ${seatId}`);
    const res = await (await fetch(`${BASE_URL}/ticket/purchase`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            eventId,
            seatId,
        })
    })).json();
    console.log(res);
    return res;
}

export const getMyTicketList = async (token:string) => {
    console.log('getMyTicketList start');
    const res = await (await fetch(`${BASE_URL}/ticket/my`, {
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

export const createQR = async (tokenId:string) => {
    console.log('createQR start');
    const res = await (await fetch(`${BASE_URL}/ticket/qr/${tokenId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })).json();
    console.log(res);
    return res;
}

export const enterQR = async (qrData:string) => {
    console.log(`enterQR start: ${qrData}`);
    const res = await (await fetch(`${BASE_URL}/ticket/enter`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            qrData,
        })
    })).json();
    console.log(res);
    return res;
}

export const cancelTicket = async (ticketId:string) => {
    console.log(`cancelTicket start: ${ticketId}`)
    const res = await (await fetch(`${BASE_URL}/ticket/cancel/${ticketId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    })).json();
    console.log(res);
    return res;
}