'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/lib/store'
import { UserProfile } from '@/config/user.modal'
import { getUser } from '@/services/userprofile'

import { setUser } from '@/store/slices/userSlice'
export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

   
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('dddddddddddddddddddddddddd');
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                console.log('a777777aaaaaa')
                storeRef.current?.dispatch(setUser(userData))
            } catch (error) {
                setError('Failed to fetch user');
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }


    return <Provider store={storeRef.current}>{children}</Provider>
}