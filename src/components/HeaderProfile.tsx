import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowCircleDown, FaArrowCircleUp, FaUserAlt, FaCat, FaSignOutAlt, FaUserFriends, FaImages, FaRegEnvelope } from 'react-icons/fa';
import { signOutUser } from '../service';
import { userLogOut } from '../redux/actions/userActions';
function HeaderProfile () {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state:any) => state.currentUser);
    const [isOpen, switchOpen] = useState(false);
    const toggle = () => {
        switchOpen(!isOpen);
    };
    const logout = async () => {
        try {
            await signOutUser();
            dispatch(userLogOut());
            switchOpen(false);
            history.push(`/`);
        } catch (e) {
            window.location.reload();
        };
    };

    if(user) {
        return (
            <div className="header__profile">
                <button onClick={toggle} className="button header__profile_button text text-normal text-white text-bald" >
                    {user.name} {user.surname}
                    {   isOpen? 
                        <FaArrowCircleUp className="header__profile_button_icon"/> :
                        <FaArrowCircleDown className="header__profile_button_icon"/>
                    }
                </button>
                {isOpen?
                    <div className="header__profile_info">
                            <img src={user.avatar} alt="" className="pic-s header__profile_info_pic"/>
                            <Link to={`/users/${user._id}`} className="link text-normal text-white">Profile <FaUserAlt className="link_icon"/></Link>
                            <Link to={`/messages`} className="link text-normal text-white">Messages <FaRegEnvelope className="link_icon"/></Link>
                            <Link to={`/users/${user._id}/friends`} className="link text-normal text-white">Friends <FaUserFriends className="link_icon"/></Link>
                            <Link to={`/users/${user._id}/pets`} className="link text-normal text-white">Pets <FaCat className="link_icon"/></Link>
                            <Link to={`/users/${user._id}/albums`} className="link text-normal text-white">Albums <FaImages className="link_icon"/></Link>
                            <button onClick={()=>{logout()}} className="button text-normal text-white">Logout <FaSignOutAlt className="button_icon"/></button>
                    </div>
                : null
                }
            </div>
        );
    } else {
        return null;
    };
};

export default HeaderProfile;