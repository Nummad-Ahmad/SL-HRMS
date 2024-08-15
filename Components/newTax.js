'use client';
import Header from "./shared/header";
import style from './newTax.module.css';
import '@/app/mainpage.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export default function NewTaxPage() {
    const router = useRouter();
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    const [requiredUser, setRequiredUser] = useState();
    const savedUser = useSelector(store => store.user).user;
    useEffect(()=>{
        axios.get(`http://localhost:8000/user/${savedUser}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    });
    const monthsArray = [
        { value: 'January 2024', label: 'January 2024' },
        { value: 'February 2024', label: 'February 2024' },
        { value: 'March 2024', label: 'March 2024' },
        { value: 'April 2024', label: 'April 2024' },
        { value: 'May 2024', label: 'May 2024' },
        { value: 'June 2024', label: 'June 2024' },
        { value: 'July 2024', label: 'July 2024' },
        { value: 'August 2024', label: 'August 2024' },
        { value: 'September 2024', label: 'September 2024' },
        { value: 'October 2024', label: 'October 2024' },
        { value: 'November 2024', label: 'November 2024' },
        { value: 'December 2024', label: 'December 2024' },
    ];
    const [amount, setAmount] = useState(0);
    const [taxMonth, setTaxMonth] = useState('January 2024');
    const [res, setRes] = useState(false);
    function handleMonth(e){
        setTaxMonth(e.target.value);
    }
    function increment(){
        setAmount(amount+100);
    }
    function decrement(){
        if(amount >= 100)
            setAmount(amount-100);
    }
    async function handleClick() {
        const newRequest = {
            month: taxMonth,
            amount: amount,
            status: 'Paid',
            email: savedUser,
        };
        const result = await axios.post('http://localhost:8000/tax', newRequest);
        if(result.data){
            toast.success('Tax paid');
            router.push('/tax');
        }else{
            toast.error('Error');
        }
        router.push('/tax');
    }
    return (
        <div className={style.requests}>
            <Header />
            <div className={style.requestscontainer}>
                <h1> Tax &gt; <span className={style.light}>Pay Tax</span> </h1>
                <div className={style.formDiv}>
                <div className={style.question}>
                <p className={style.p}>Tax amount</p>
                <p onClick={decrement} className={style.number}>-</p>
                <p className={style.p}>{amount}</p>
                <p onClick={increment} className={style.number}>+</p>
                            {/* <input className={style.amountinput} type='number' placeholder="Enter tax amount"  onChange={handleAmount}></input> */}
                    </div>
                    <div className={style.question}>
                    <label for="Tax month">Tax month</label>
                        <select onChange={handleMonth} value={taxMonth}>
                            {
                                monthsArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))

                            }
                        </select>
                    </div>
                </div>
                <div className={style.btnDiv}>
                    <button onClick={handleClick} className={style.btn}>Add</button>
                </div>
            </div>
        </div>
    );
}