import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {favouritesAtom, searchHistoryAtom} from '@/store';
import {getFavourites, getHistory} from '@/lib/userData';
import {isAuthenticated} from '@/lib/authenticate';
import { set } from 'react-hook-form';

const PUBLIC_PATHS = ['/login', '/', '/register' ];

export default function RouteGuard(props) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        try{
            const favourites = await getFavourites();
            const history = await getHistory();
            setFavouritesList(favourites);
            setSearchHistory(history);
        }catch(err){
            console.error('Error updating atoms:', err);
        }
    }
    
    useEffect(() =>{
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    },[]);

    async function authCheck(url){
        const path = url.split('?')[0];
        if(!isAuthenticated() && !PUBLIC_PATHS.includes(path)){
            setAuthorized(false);
            router.push('/login');
    }else{
        if(isAuthenticated()){
            await updateAtoms();
        }
        setAuthorized(true);
    }
}
return <> {authorized && props.children}</>;
}