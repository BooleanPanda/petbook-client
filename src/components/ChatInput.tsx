import React, {useState} from 'react';

const Form = (props:any) => {
    const [data, setData] = useState('');
    const handleInputChange = (value:string) => {
        setData(value);
    };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(data) {
            props.handleSubmit(data);
            setData('');
        };
    };
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input  className="form_input" 
                    type='text' 
                    onChange={(e)=>{handleInputChange(e.target.value)}}
                    placeholder='message'
                    value={data}
            />
            <input type="submit" value='send'/>
        </form>
    );
};

export default Form;