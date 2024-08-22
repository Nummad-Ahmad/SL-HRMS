import { useEffect, useState } from 'react';
import style from './users.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Employee({ id, name, email, dept, position, salary }) {
    const savedUser = useSelector(store => store.user);
    const [requiredUser, setRequiredUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8000/user/${savedUser.user}`).then(res => setRequiredUser(res.data)).catch(e => console.log(e));
    },[]);
    const Position = requiredUser.position;
    return (
        <div className={`${style.showusers} ${ id % 2 == 0 ? style.even : ''}`}>
            <div className={style.id}>
                <p className={style.p}>{id}</p>
            </div>
            <div className={style.name}>
                <p className={style.p}>{name}</p>
            </div>
            <div className={style.email}>
                <p className={style.p}>{email}</p>
            </div>
            <div className={style.dept}>
                <p className={style.p}>{dept}</p>
            </div>
            <div className={style.position}>
                <p className={style.p}>{position}</p>
            </div>
            {
                Position === 'Human Resource' || Position === 'Admin' ?
                <div className={style.salary}>
                    <p className={style.p}>{salary}</p>
                </div> : <div/>
            }
        </div>
    );
}