'use client';
import Header from "./shared/header";
import Image from "next/image";
import ProfilePic from '@/public/profile pic.png';
import NoData from '@/public/noData.png';
import style from './project.module.css';
import '@/app/mainpage.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";

export default function RequestsPage() {
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/projects').
            then(res => setProjects(res.data)).
            catch(e => console.log('Error ', e));
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    }, []);
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = selectedIndex * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = projects.slice(firstIndex, lastIndex);
    const currentPage = Math.ceil(projects.length / recordsPerPage);
    const numbers = [...Array(currentPage + 1).keys()].slice(1);

    const [text, setText] = useState('');
    const [isClicked, setClicked] = useState(false);
    const [filteredProject, setFilteredData] = useState([]);
    function ascendingSort() {
        setSelectedIndex(1);
        const sortedProjects = [...projects].sort((a, b) => a.name.localeCompare(b.name));
        setProjects(sortedProjects);
    }
    function descendingSort() {
        setSelectedIndex(1);
        const sortedProjects = [...projects].sort((a, b) => b.name.localeCompare(a.name));
        setProjects(sortedProjects);
    }
    function handleChange(e) {
        setText(e.target.value);
        if (text.length == 1) {
            setClicked(false);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSelectedIndex(1);
            event.preventDefault();
            setClicked(true);
            setFilteredData(projects.filter((item) => item.name == text));
        }
    };
    const renderShowingInfo = () => {
        let showingCount;
        if (!isClicked) {
            showingCount = lastIndex > projects.length
                ? ((lastIndex - projects.length) - recordsPerPage) * -1 + 10
                : lastIndex;
        } else {
            if (filteredProject.length == 0) {
                showingCount = 0;
            } else {
                showingCount = 1;
            }
        }
        return (
            <div>
                Showing <p className={style.bold}>{showingCount}</p> of <p className={style.bold}>{projects.length}</p>
            </div>
        );
    };
    return (
        <div className={style.requests}>
            <Header />
            <div className={style.requestsContainer}>
                <div className={style.titleandusername}>
                    <h1>Projects</h1>
                    <div className={style.nameandimg}>
                        <div className={style.nameandrole}>
                            <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'NAME'}</p>
                            <p className={style.role}>{requiredUser.name != undefined ? requiredUser.position : 'EMPLOYEE'}</p>
                        </div>
                        <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                    </div>
                </div>
                {
                    projects.length != 0 ?
                        <>
                            <div className={style.shadow}>
                                <div className={style.detaileddata}>
                                    <div className={style.serial}><h3 className={style.h3}><GoProjectRoadmap size={25} color='rgba(0, 79, 206, 0.75)' /></h3></div>
                                    <div className={style.name}>
                                        <h3 className={style.h3}>Projects</h3>
                                        <div className={style.arrowcontainer}>
                                            <div className={style.arrow}><FaArrowUp onClick={() => ascendingSort()} size={6} /><FaArrowDown onClick={() => descendingSort()} size={6} /></div>
                                        </div>
                                    </div>
                                    <div className={style.status}><h3 className={style.h3}>Status</h3></div>
                                    <div className={style.inputDiv}>
                                        <input className={style.input} placeholder="Enter project name" value={text} onKeyDown={handleKeyDown} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className={style.details}>
                                    <div className={style.scroll}>
                                        {
                                            !isClicked ?
                                                records.map((item, index) => {
                                                    return (
                                                        <div className={`${style.detaileddata} ${index % 2 == 1 ? style.even : ''}`} key={index}>
                                                            <div className={style.serial}>{index + 1}</div>
                                                            <div className={style.name}>{item.name}</div>
                                                            <div>{item.status}</div>
                                                        </div>

                                                    );
                                                }) :
                                                filteredProject.map((item, index) => {
                                                    return (
                                                        <div className={`${style.detaileddata} ${index % 2 == 0 ? style.even : ''}`} key={index}>
                                                            <div className={style.serial}>{index + 1}</div>
                                                            <div className={style.name}>{item.name}</div>
                                                            <div>{item.status}</div>
                                                        </div>

                                                    );
                                                })
                                        }
                                    </div>
                                </div>
                                <div className={style.filterscontainer}>
                                    {renderShowingInfo()}

                                    <span className={style.pagination}>
                                        <div onClick={() => selectedIndex != 1 && setSelectedIndex(selectedIndex - 1)} className={`${style.paginationbtn} `}>Prev</div>

                                        {
                                            numbers.map((data, index) => {
                                                return (
                                                    <>
                                                        <div onClick={() => setSelectedIndex(data)} key={index} className={`${style.paginationnumber} ${selectedIndex == data ? style.activeIndex : ''}`}>{data}</div>
                                                    </>
                                                )
                                            })

                                        }
                                        <div onClick={() => (lastIndex < projects.length - 1) && setSelectedIndex(selectedIndex + 1)} className={`${style.paginationbtn} `}>Next</div>
                                    </span>
                                </div>
                            </div>
                        </>
                        :
                        <Image className={style.noData} src={NoData} width={400} height={400} alt=""></Image>
                }
            </div>
        </div>
    );
}