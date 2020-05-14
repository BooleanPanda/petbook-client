import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { LoadingState, signUpUser } from '../service';
import Loading from '../utils/Loading';
import Form from '../components/Form';
import { useDispatch } from 'react-redux';
import { userChanged } from '../redux/actions/userActions';

const SignUpPage: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState<LoadingState>();
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();

    const signUp = async (data:any) => {
        try {
            setLoading(LoadingState.Loading);
            const resp = await signUpUser(data);
            const id = resp.data.user._id;
            localStorage.setItem('PBToken', resp.data.user.tokens[0].token);
            localStorage.setItem('PBUserId', id);
            await dispatch(userChanged())
            history.push(`/users/${id}`);
        } catch (e) {
            setLoading(LoadingState.Failed);
            setErrorMsg(e.response.data.error);
        };
    };

    return (
        <> 
        <p>Sign up page</p>
        <Form label="Sign Up" fields={['name', 'surname', 'login', 'password', 'phone', 'email']} handleSubmit={signUp} required={true}/>
        <div>
            { 
                loading===LoadingState.Loading? <Loading/> : loading===LoadingState.Failed? errorMsg : ``
            }
        </div>
        <br/>
        <Link to={`/`} className="link text-big text-bald text-white">Sign in <FaSignInAlt className="link_icon"/></Link>
        </>
    );
};

export default SignUpPage;