import Header from "./shared/header";
import '@/app/mainpage.css';
import style from './checkin.module.css';
import ProfilePic from '@/public/profile pic.png';
import Image from "next/image";
export default function CheckInPage() {
    return <div className={style.attedance}>
        <Header />
        <div className={style.attedancecontainer}>
            <div className={style.titleandusername}>
                <h1>Attendance &gt; <span className={style.lightText}>Check-in</span></h1>
                <div className={style.nameandimg}>
                    <div className={style.nameandrole}>
                        {/* <p className={style.username}>{requiredUser.name != undefined ? requiredUser.name : 'Ahmad'}</p> */}
                        <p className={style.role}>EMPLOYEE</p>
                    </div>
                    <Image className={style.profilepic} src={ProfilePic} height={40} width={40} alt=''></Image>
                </div>
            </div>
        </div>
    </div>
}