import React, {useState} from 'react';

interface Props {
    label: string,
    fields: string[],
    required: boolean,
    handleSubmit: (data:any)=>void,
};

const Form = (props:Props) => {
    const [data, setData] = useState({});
    const handleInputChange = (field:string, value:string) => {
        setData({...data, [field]:value});
    };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        props.handleSubmit(data);
    };
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            {
                props.fields.map((field:string, index:number)=>{
                    let type = "text";
                    if (field==="password") {
                        type = "password";
                    };
                    return (
                        <input  className="form_input" 
                                required={props.required}
                                type={type} 
                                placeholder={field} 
                                key={index} 
                                onChange={(e)=>{handleInputChange(field, e.target.value)}}
                        />
                    );
                })
            }
            <input type="submit" value={props.label}/>
        </form>
    );
};

export default Form;