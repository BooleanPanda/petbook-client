import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { LoadingState, signInUser } from '../service';
import Loading from '../utils/Loading';
import Form from '../components/Form';
import { userChanged } from '../redux/actions/userActions';

const LoginPage: React.FC = (props:any) => {
    const history = useHistory();
    const [loading, setLoading] = useState<LoadingState>();
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    
    const signIn = async (data:any) => {
        try {
            setLoading(LoadingState.Loading);
            const resp = await signInUser(data);
            const id = resp.data.result.id;
            localStorage.setItem('PBToken', resp.data.result.token);
            localStorage.setItem('PBUserId', id);
            dispatch(userChanged());
            try {
                history.push(props.location.state.from);
            } catch {
                history.push(`/users/${id}`);
            };
        } catch (e) {
            setLoading(LoadingState.Failed);
            setErrorMsg(e.response.data.error);
        };
    };

    return (
        <>
            <p>Greetings!</p>
            <p>Sign in if you already have an account:</p>
            <Form label="Sign In" fields={['login', 'password']} handleSubmit={signIn} required={true}/>
            <div>
                { 
                    loading===LoadingState.Loading? <Loading/> : loading===LoadingState.Failed? errorMsg : ``
                }
            </div>
            <p>Or create one:</p>
            <Link to={`/signup`} className="link text-big text-bald text-white">Sign up <FaUserPlus className="link_icon"/></Link>
        </>
    );
};

export default LoginPage;