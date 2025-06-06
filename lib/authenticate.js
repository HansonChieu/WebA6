import { jwtDecode } from 'jwt-decode';

function setToken(token){
    localStorage.setItem('access_token', token);
}

export function getToken(){
    try{
        return localStorage.getItem('access_token');
    }catch(err){
        return null;
    }
}

export function removeToken(){
    localStorage.removeItem('access_token');
}

export function readToken(){
    try{
        const token = getToken();
        return token ? jwtDecode(token) : null;
    }catch(err){
        return null;
    }
}

export function isAuthenticated(){
    const token = readToken();
    return token ? true : false;
}

export async function authenticateUser(username, password){
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/login', {
        method: 'POST',
        body: JSON.stringify({
            userName: user,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    if(res.status === 200){
        setToken(data.access_token);
        return true;
    }else{
        throw new Error(data.message);
    }
}

export async function registerUser(username, password, password2){
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/register', {
        method: 'POST',
        body: JSON.stringify({
            userName: user,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    if(res.status === 200){
        return true;
    }else{
        throw new Error(data.message);
    }
}