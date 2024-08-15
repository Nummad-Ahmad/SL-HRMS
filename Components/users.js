'use client';
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/nodata.png';
import style from './users.module.css';
import '@/app/mainpage.css';
import { FaSearch } from "react-icons/fa";
import Employee from "./employee";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function UsersPage() {
    const router = useRouter();
    const savedUser = useSelector(store => store.user);
    console.log('saved', savedUser);
    const [requiredUser, setRequiredUser] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/user').then(res => setUsers(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    console.log('required', requiredUser);
    console.log('position', requiredUser.position);
    console.log('position', typeof (requiredUser.position));
    const Position = requiredUser.position;
    const [text, setText] = useState('');
    const [isClicked, setClicked] = useState(false);
    const [filteredEmployee, setFilteredData] = useState([]);
    function handleChange(e) {
        setText(e.target.value);
        console.log(text.length);
        if (text.length == 1) {
            setClicked(false);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSelectedIndex(1);
            event.preventDefault();
            setClicked(true);
            setFilteredData(users.filter((item) => item.name == text));
        }
    };
    const [option, setOption] = useState('Select');
    const filterOptions = [
        { value: 'Select', label: 'Select' },
        { value: 'HR', label: 'HR' },
        { value: 'Development', label: 'Development' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'QA', label: 'QA' },
    ];
    function handleOption(e) {
        setSelectedIndex(1);
        setOption(e.target.value);
    }
    function ascendingSort() {
        setSelectedIndex(1);
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
    }
    function descendingSort() {
        setSelectedIndex(1);
        const sortedUsers = [...users].sort((a, b) => b.name.localeCompare(a.name));
        setUsers(sortedUsers);
    }
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records =  users.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(currentPage + 1).keys()].slice(1);
    const deptWiseData = users.filter(item => item.department == option);
    return (
        <div className={style.user}>
            <Header />
            <div className={style.usercontainer}>
                <div className={style.titleandusername}>
                    <h1>Users</h1>
                    <div className={style.nameandimg}>
                        <div className={style.nameandrole}>
                            <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                            <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                        </div>
                        <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                    </div>
                </div>
                {
                    users.length != 0 ?
                        <>
                            <div className={style.inputDiv}>
                                <input className={style.input} placeholder="Enter name of user to search" value={text} onKeyDown={handleKeyDown} onChange={handleChange} />
                                <span>
                                    <label htmlFor="option">Filter dept</label>
                                    <select className={style.select} id="option" name="option" onChange={handleOption} value={option}>
                                        {
                                            filterOptions.map(type => (
                                                <option key={type.value} label={type.value}>{type.value}</option>
                                            ))
                                        }
                                    </select>
                                </span>
                            </div>
                            <div className={style.usersdata}>
                                <div className={style.titles}>
                                    <div className={style.id}>
                                        <h3 className={style.p}>Sr#</h3>
                                    </div>
                                    <div className={style.name}>
                                        <h3 className={style.p}>Name</h3>
                                        <span className={style.arrowcontainer}>
                                            <div className={style.arrow}><FaArrowUp onClick={() => ascendingSort()} size={6} /><FaArrowDown onClick={() => descendingSort()} size={6} /></div>
                                        </span>
                                    </div>
                                    <div className={style.email}>
                                        <h3 className={style.p}>Email</h3>
                                    </div>
                                    <div className={style.dept}>
                                        <h3 className={style.p}>Department</h3>
                                    </div>
                                    <div className={style.position}>
                                        <h3 className={style.p}>Posititon</h3>
                                    </div>
                                    {
                                        Position === 'Human Resource' || Position === 'Admin' ?
                                            <div className={style.position}>
                                                <h3 className={style.p}>Salary</h3>
                                            </div> : <div></div>
                                    }
                                </div>
                                <div className={style.scroll}>
                                    {
                                        !isClicked ?
                                            option == 'Select' ?
                                                records.map((item, index) => {
                                                    return (
                                                        <Employee key={index} name={item.name} id={index + 1} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                    );
                                                }) :
                                                deptWiseData.map((item, index) => {
                                                    return (
                                                        <Employee key={index} name={item.name} id={index + 1} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                    );
                                                }) :
                                            filteredEmployee.map((item, index) => {
                                                return (
                                                    <Employee key={index} name={item.name} id={item.id} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                );
                                            })
                                    }
                                </div>

                            </div>
                            <span className={style.pagination}>
                                {
                                    numbers.map((data, index) => {
                                        return (
                                            <>
                                                <div onClick={() => setSelectedIndex(data)} key={index} className={`${style.paginationnumber} ${selectedIndex == data ? style.activeIndex : ''}`}>{data}</div>
                                            </>
                                        )
                                    })
                                }
                            </span>
                            {
                                (Position === 'Human Resource' || Position === 'Admin') &&
                                <div className={style.buttonDiv}>
                                    <button onClick={() => router.push('/newUser')} className={style.btn}>Add User</button>
                                </div>
                            }
                        </>
                        :
                        <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                }
            </div>
        </div>
    );
}