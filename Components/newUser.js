'use client';
import Header from "./shared/header";
import '@/app/mainpage.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import '@/app/mainpage.css';
import style from './newUser.module.css';

export default function NewUserPage() {
    const router = useRouter();
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    const [requiredUser, setRequiredUser] = useState({});
    const savedUser = useSelector(store => store.user);
    useEffect(() => {
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const currentUserPosition = requiredUser.position;
    const departmentArray1 = [
        { value: 'Development', label: 'Development' },
        { value: 'HR', label: 'HR' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'QA', label: 'QA' },
    ];
    const departmentArray2 = [
        { value: 'Development', label: 'Development' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'QA', label: 'QA' },
    ];
    const positionArray1 = [
        { value: 'App Developer', label: 'App Developer' },
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Human Resource', label: 'Human Resource' },
        { value: 'SQA Engineer', label: 'SQA Engineer' },
        { value: 'Graphics Designer', label: 'Graphics Designer' },
    ];
    const positionArray2 = [
        { value: 'App Developer', label: 'App Developer' },
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'SQA Engineer', label: 'SQA Engineer' },
        { value: 'Graphics Designer', label: 'Graphics Designer' },
    ];
    const genderArray = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];
    const [salary, setSalary] = useState(0);
    const [department, setDepartment] = useState('HR');
    const [position, setPosition] = useState('Human Resource');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState('');
    const [name, setName] = useState('');
    const [res, setRes] = useState();
    const [password, setPassword] = useState('');
    function handleName(e) {
        setName(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handleDepartment(e) {
        setDepartment(e.target.value);
    }
    function handleBirthday(e) {
        setBirthday(e.target.value);
    }
    function handleGender(e) {
        setGender(e.target.value);
    }
    function handlePosition(e) {
        setPosition(e.target.value);
    }
    function decrement() {
        if (salary >= 5000) {
            setSalary(salary - 5000);
        }
    }
    function increment() {
        setSalary(salary + 5000);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    async function handleClick() {
        if (!name || !password || !email) {
            toast.error('Fill all fields');
            return;
        } else {
            const newRequest = {
                name,
                gender,
                department,
                email,
                position,
                salary,
                password,
                birthday
            };
            try {
                const result = await axios.post('http://localhost:8000/newuser', newRequest);
                if (!(result.data)) {
                    toast.error('This email is already registered');
                } else {
                    toast.success('New user added');
                    router.push('/users');
                    axios.patch('http://localhost:8000/updatecount', { department });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <div className={style.requests}>
            <Header />
            <div className={style.requestscontainer}>
                <h1> Users &gt; <span className={style.light}>Add User</span> </h1>
                <div className={style.formDiv}>
                    <div className={style.question}>
                        <input className={style.amountinput} onChange={handleName} type="text" placeholder="Enter name" />
                    </div>
                    <div className={style.question}>
                        <input className={style.amountinput} onChange={handleEmail} type="text" placeholder="Enter email" />
                    </div>
                </div>
                <div className={style.formDiv}>
                    <div className={style.question}>
                        <p className={style.p}>Date of birth</p>
                        <input onChange={handleBirthday} className="dateInput" name='date' id='date' type="date" />
                    </div>
                    <div className={style.question}>
                        <label htmlFor="Department">Department</label>
                        <select onChange={handleDepartment} value={department}>
                            {
                                currentUserPosition === 'Admin' ?
                                    departmentArray1.map(type => (
                                        <option key={type.value} label={type.value}>{type.value}</option>
                                    )) :
                                    departmentArray2.map(type => (
                                        <option key={type.value} label={type.value}>{type.value}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>
                <div className={style.formDiv}>
                    <div className={style.question}>
                        <label htmlFor="Gender">Gender</label>
                        <select onChange={handleGender} value={gender}>
                            {
                                genderArray.map(type => (
                                    <option key={type.value} label={type.value}>{type.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={style.question}>
                        <label htmlFor="Position">Position</label>
                        <select onChange={handlePosition} value={position}>
                            {
                                currentUserPosition === 'Admin' ?
                                    positionArray1.map(type => (
                                        <option key={type.value} label={type.value}>{type.value}</option>
                                    )) :
                                    positionArray2.map(type => (
                                        <option key={type.value} label={type.value}>{type.value}</option>
                                    ))
                            }
                        </select>
                    </div>
                </div>
                <div className={style.formDiv}>
                    <div className={style.question}>
                        <p className={style.p}>Salary</p>
                        <p onClick={decrement} className={style.sign}>-</p>
                        <p className={style.p}>{salary}</p>
                        <p onClick={increment} className={style.sign}>+</p>
                    </div>
                    <div className={style.question}>
                        <input className={style.amountinput} onChange={handlePassword} type="text" placeholder="Enter password" />
                    </div>
                </div>
                <div className={style.btnDiv}>
                    <button onClick={handleClick} className={style.btn}>Add</button>
                </div>
            </div>
        </div>
    );
}