'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/lib/store'
import { UserProfile } from '@/config/user.modal'
import { getUser, useGetUser } from '@/services/userprofile'

import { setUser } from '@/store/slices/userSlice'
import Spinner from '@/components/spinner'
import { useAppSelector } from '@/store/lib/hooks'

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



    console.log(storeRef.current.getState().user);
    const { userInfo, isLoading, isError } = useGetUser();

    storeRef.current?.dispatch(setUser(userInfo))




    if (isLoading) return <Spinner />;
    if (!isLoading) return <Provider store={storeRef.current}>{children}</Provider>
    if (isError) return <div>{isError}</div>
}