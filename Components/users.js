'use client';
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/noData.png';
import style from './users.module.css';
import '@/app/mainpage.css';
import Employee from "./employee";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function UsersPage() {
    const router = useRouter();
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/user').then(res => setUsers(res.data)).catch(e => console.log(e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const Position = requiredUser.position;
    const [text, setText] = useState('');
    const [isClicked, setClicked] = useState(false);
    const [filteredEmployee, setFilteredData] = useState([]);
    function handleChange(e) {
        setText(e.target.value);
        if (text.length == 1) {
            setClicked(false);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && text != '') {
            setSelectedIndex(1);
            event.preventDefault();
            setClicked(true);
            setFilteredData(users.filter((item) => item.name == text));
            console.log(filteredEmployee);
        }
    };
    const [option, setOption] = useState('Select dept');
    const [position, setPosition] = useState('Select position');
    const positionOptions = [
        { value: 'Select position', label: 'Select posiiton' },
        { value: 'Human Resource', label: 'Human Resource' },
        { value: 'SQA Engineer', label: 'SQA Engineer' },
        { value: 'App Developer', label: 'App Developer' },
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Graphics Designer', label: 'Graphics Designer' },
    ];
    const deptOptions = [
        { value: 'Select dept', label: 'Select dept' },
        { value: 'HR', label: 'HR' },
        { value: 'Development', label: 'Development' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'QA', label: 'QA' },
    ];
    function handleOption(e) {
        setSelectedIndex(1);
        setOption(e.target.value);
        setPosition('Select position');
    }
    function handlePosition(e) {
        setSelectedIndex(1);
        setPosition(e.target.value);
        setOption('Select dept');
    }
    function ascendingSort() {
        setSelectedIndex(1);
        setOption('Select dept');
        setPosition('Select position');
        const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
    }
    function descendingSort() {
        setSelectedIndex(1);
        setOption('Select dept');
        setPosition('Select position');
        const sortedUsers = [...users].sort((a, b) => b.name.localeCompare(a.name));
        setUsers(sortedUsers);
    }
    const deptWiseData = users.filter(item => item.department == option);
    const positionWiseData = users.filter(item => item.position == position);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(users.length / recordsPerPage);
    const [numbers, setNumbers] = useState([]);
    useEffect(() => {
        if (option === 'Select dept') {
            const currentPage = Math.ceil(users.length / recordsPerPage);
            setNumbers([...Array(currentPage + 1).keys()].slice(1));
        } else {
            setNumbers([1]);
        }
    }, [option, users]);
    const renderEmployees = () => {
        let dataToRender = [];
    
        if (!isClicked) {
            if (option === 'Select dept' && position === 'Select position') {
                dataToRender = records;
            } else if (option !== 'Select dept' && position === 'Select position') {
                dataToRender = deptWiseData;
            } else if (option === 'Select dept' && position !== 'Select position') {
                dataToRender = positionWiseData;
            }
        } else {
            dataToRender = filteredEmployee;
        }
    
        return dataToRender.map((item, index) => (
            <Employee 
                key={index} 
                name={item.name} 
                id={index + 1} 
                email={item.email} 
                dept={item.department} 
                position={item.position} 
                salary={item.salary} 
            />
        ));
    };
    const renderShowingInfo = () => {
        let showingCount;
        if(!isClicked){
        if (option === 'Select dept' && position === 'Select position') {
            showingCount = lastIndex > users.length 
                ? ((lastIndex - users.length) - recordsPerPage) * -1 + 10 
                : lastIndex;
        } else if (option === 'Select dept' && position !== 'Select position') {
            showingCount = positionWiseData.length;
        } else {
            showingCount = deptWiseData.length;
        }
        }else{
            showingCount = filteredEmployee.length;
        }
        return (
            <div>
                Showing <p className={style.bold}>{showingCount}</p> of <p className={style.bold}>{users.length}</p>
            </div>
        );
    };
    
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
                        <div className={style.shadow}>
                            <div className={style.inputDiv}>
                                <div className={style.filterscontainer}>
                                    <span>
                                        {/* <label htmlFor="option"></label> */}
                                        <select className={style.select} id="option" name="option" onChange={handleOption} value={option}>
                                            {
                                                deptOptions.map(type => (
                                                    <option key={type.value} label={type.value}>{type.value}</option>
                                                ))
                                            }
                                        </select>
                                    </span>
                                    <span>
                                        <label htmlFor="position"></label>
                                        <select className={style.select} id="position" name="position" onChange={handlePosition} value={position}>
                                            {/* <ul> */}
                                            {
                                                positionOptions.map(type => (
                                                    <option className={style.option} key={type.value} label={type.value}>{type.value}</option>
                                                ))
                                            }
                                            {/* </ul> */}
                                        </select>
                                    </span>
                                    </div>
                                <div className={style.flex}>
                                    <input className={`${ (Position === 'Human Resource' || Position === 'Admin') ? style.input : style.employeeinput}`} placeholder="Enter name of user to search" value={text} onKeyDown={handleKeyDown} onChange={handleChange} />
                                    {
                                        (Position === 'Human Resource' || Position === 'Admin') &&
                                        <div className={style.buttonDiv}>
                                            <button onClick={() => router.push('/newUser')} className={style.btn}>Add User</button>
                                        </div>
                                    }
                                    {/* <span>
                                    <label htmlFor="option">Filter dept</label>
                                    <select className={style.select} id="option" name="option" onChange={handleOption} value={option}>
                                        {
                                            filterOptions.map(type => (
                                                <option key={type.value} label={type.value}>{type.value}</option>
                                            ))
                                        }
                                    </select>
                                </span> */}
                                </div>
                            </div>
                            <div className={style.usersdata}>
                                <div className={style.titles}>
                                    <div className={style.id}>
                                        <h3 className={style.p}><FaUsers size={25} color='rgba(0, 79, 206, 0.75)' /></h3>
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
                                        <h3 className={style.p}>Position</h3>
                                    </div>
                                    {
                                        Position === 'Human Resource' || Position === 'Admin' ?
                                            <div className={style.position}>
                                                <h3 className={style.p}>Salary</h3>
                                            </div> : <div></div>
                                    }
                                </div>
                                <div className={style.scroll}>
                                    {/* {
                                        !isClicked ?
                                            (option == 'Select dept' && position == 'Select position') ?
                                                records.map((item, index) => {
                                                    return (
                                                        <Employee key={index} name={item.name} id={index + 1} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                    );
                                                })
                                                :
                                                (option != 'Select dept' && position == 'Select position') ?
                                                    deptWiseData.map((item, index) => {
                                                        return (
                                                            <Employee key={index} name={item.name} id={index + 1} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                        );
                                                    })
                                                    :
                                                    (option == 'Select dept' && position != 'Select position') &&
                                                    positionWiseData.map((item, index) => {
                                                        return (
                                                            <Employee key={index} name={item.name} id={item.id} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                        );
                                                    }) :
                                            isClicked &&
                                            filteredEmployee.map((item, index) => {
                                                return (
                                                    <Employee key={index} name={item.name} id={item.id} email={item.email} dept={item.department} position={item.position} salary={item.salary}></Employee>
                                                );
                                            })
                                    } */}
                                    {renderEmployees()}
                                </div>
                            </div>
                            <span className={style.pagination}>
                                {
                                    /* {
                                    (option == 'Select dept' && position == 'Select position') ?
                                        (lastIndex > users.length ?
                                            <div>Showing <p className={style.bold}>{((lastIndex - users.length) - recordsPerPage) * -1 + 10}</p> of <p className={style.bold}>{users.length}</p></div> :
                                            <div>Showing <p className={style.bold}>{lastIndex}</p> of <p className={style.bold}>{users.length}</p></div>) :
                                        (option == 'Select dept' && position != 'Select position') ?
                                            <div>Showing <p className={style.bold}>{positionWiseData.length}</p> of <p className={style.bold}>{users.length}</p></div> :
                                            <div>Showing <p className={style.bold}>{deptWiseData.length}</p> of <p className={style.bold}>{users.length}</p></div>
                                } */}
                                {renderShowingInfo()}
                                <div className={style.filterscontainer}>
                                <div onClick={() => selectedIndex != 1 && setSelectedIndex(selectedIndex-1)} className={`${style.paginationbtn} `}>Prev</div>
                                    {
                                        (option == 'Select dept' && position == 'Select position' && text === "") ?
                                            numbers.map((data, index) => {
                                                return (
                                                    <>
                                                        <div onClick={() => setSelectedIndex(data)} key={index} className={`${style.paginationnumber} ${selectedIndex == data ? style.activeIndex : ''}`}>{data}</div>

                                                    </>
                                                )
                                            }) : <div className={`${style.activeIndex} ${style.paginationnumber}`}>1</div>
                                    }
                                    <div onClick={() => (lastIndex < users.length-1) && setSelectedIndex(selectedIndex+1)} className={`${style.paginationbtn} `}>Next</div>
                                </div>
                            </span>
                            {/* {
                                (Position === 'Human Resource' || Position === 'Admin') &&
                                <div className={style.buttonDiv}>
                                    <button onClick={() => router.push('/newUser')} className={style.btn}>Add User</button>
                                </div>
                            } */}
                        </div>
                        :
                        <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                }
            </div>
        </div>
    );

}