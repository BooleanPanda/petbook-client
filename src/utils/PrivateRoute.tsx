import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }:any) {
    const userId = localStorage.getItem('PBUserId');
    return (
        <Route {...rest}
            component = { (props:any) => userId?
                                    <Component {...props}/> : 
                                    <Redirect to = {{ 
                                                    pathname: '/', 
                                                    state: {from: props.location}
                                                }}
                                    />
                        }
        />
    );
};

export default PrivateRoute;