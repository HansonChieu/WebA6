import { getToken } from './authenticate.js';

async function makeAuthenticatedRequest(url, method = 'Get', body = null) {
    const token = getToken();
    const options = {
        method,
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);

    if (res.status === 200) {
        return await res.json();
    }else{
        return [];
    }
}

export async function addToFavourites(id){
    return await makeAuthenticatedRequest('/favourites/${id}', 'PUT');
}

export async function removeFromFavourites(id){
    return await makeAuthenticatedRequest('/favourites/${id}', 'DELETE');
}
    
export async function getFavourites(){
    return await makeAuthenticatedRequest('/favourites', 'GET');
}

export async function addToHistory(id){
    return await makeAuthenticatedRequest('/history/${id}', 'PUT');
}

export async function removeFromHistory(id){
    return await makeAuthenticatedRequest('/history/${id}', 'DELETE');
}

export async function getHistory(){
    return await makeAuthenticatedRequest('/history', 'GET');
}

