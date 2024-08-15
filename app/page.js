'use client'
import './mainpage.css';
import toast, { Toaster } from 'react-hot-toast';
import HomePage from "@/Components/homepage"
import { Provider } from 'react-redux';
import userStore from '@/redux/userStore';
export default function Home() {
    return (
        <Provider store={userStore}>
            <HomePage></HomePage>
            <Toaster />
        </Provider>
    )
}