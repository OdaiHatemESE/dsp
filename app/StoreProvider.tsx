'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/lib/store'
import { UserProfile } from '@/config/user.modal'
import { getUser, useGetUser } from '@/services/userprofile'

import { setUser } from '@/store/slices/userSlice'
import Spinner from '@/components/spinner'
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

    const { userInfo, isLoading, isError } = useGetUser();
    storeRef.current?.dispatch(setUser(userInfo))
    if (isLoading) return <Spinner />
    if (isError) return <div>{isError}</div>


    return <Provider store={storeRef.current}>

 
        {children}
    </Provider>
}