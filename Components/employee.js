import './users.css';
export default function Employee({ id, name, email, dept, position }) {
    return (
        <div className="show-users">
            <div className="id">
                <p>{id}</p>
            </div>
            <div className="name">
                <p>{name}</p>
            </div>
            <div className="email">
                <p>{email}</p>
            </div>
            <div className="dept">
                <p>{dept}</p>
            </div>
            <div className="position">
                <p>{position}</p>
            </div>
        </div>
    );
}