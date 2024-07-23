'use client';
import Header from "./shared/header";
import { IoPersonSharp } from "react-icons/io5";
import './users.css';
import { FaSearch } from "react-icons/fa";
import Employee from "./employee";
import {usersArray} from './usersData';
import { useState } from "react";
export default function UsersPage() {
    const [text, setText] = useState('');
    const [isClicked, setClicked] = useState(false);
    const [filteredEmployee, setFilteredData] = useState([]);
    function handleChange(e){
        setText(e.target.value);
        console.log(text.length);
        if(text.length == 1){
            setClicked(false);
        }    
    }
    function search(){
        setClicked(true);
        setFilteredData(usersArray.filter((item) =>item.name == text));
    }
    return (
        <div className="user">
            <Header />
            <div className="user-container">
                <div className='title-and-username'>
                    <h2>User</h2>
                    <div className='name-and-img'>
                        <div className='name-and-role'>
                            <p className='username'>Muhammad Ahmad</p>
                            <p className='role'>EMPLOYEE</p>
                        </div>
                        <IoPersonSharp size={30} />
                    </div>
                </div>
                <div className="inputDiv">
                    <input placeholder="Search" value={text} onChange={handleChange}/>
                    <div onClick={search} className="search"><FaSearch size={20} /></div>
                </div>
                <div className="users-data">
                    <div className="titles">
                        <div className="id">
                            <p>EMP ID</p>
                        </div>
                        <div className="name">
                            <p>NAME</p>
                        </div>
                        <div className="email">
                            <p>EMAIL</p>
                        </div>
                        <div className="dept">
                            <p>DEPARTMENT</p>
                        </div>
                        <div className="position">
                            <p>POSITION</p>
                        </div>
                    </div>
                    <div className="scroll">
                        {
                            !isClicked ?
                            usersArray.map((item) => {
                                return (
                                    <Employee name={item.name} id={item.id} email={item.email} dept={item.dept} position={item.position}></Employee>
                                );
                            }) :
                            filteredEmployee.map((item) => {
                                return (
                                    <Employee name={item.name} id={item.id} email={item.email} dept={item.dept} position={item.position}></Employee>
                                );
                            }) 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}