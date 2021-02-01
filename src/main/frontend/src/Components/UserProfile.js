import {useState}from 'react';
import Dropzone from './Dropzone';

const UserProile = (props) => {
    const [showDropzone, setDropzone] = useState(false);
    const toggle = () => setDropzone(!showDropzone);
    return (
        <div className="user-profile">
            { !props.userProfileID ? null :
                <img src={`http://localhost:8080/api/v1/user-profiles/${props.userProfileID}/image/download`} alt={`${props.username}`} />}
            <h3>{props.firstName + ' ' + props.lastName}</h3>
            <h5>{props.username}</h5>
            <p>{props.userProfileID}</p>
            { showDropzone ? <Dropzone userProfileId={props.userProfileID} toggle={toggle}/> : 
                <button onClick={toggle} className="btn btn-dark">Change Picture</button>
            }

        </div>
        );
}

export default UserProile;