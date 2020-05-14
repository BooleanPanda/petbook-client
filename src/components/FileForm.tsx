import React, {useState} from 'react';
interface Props {
  label: string,
  title: string,
  handleSubmit: any,
  single: boolean
}
const FileForm = (props:Props) => {
    const [files, setFiles] = useState();
    const [preview, setPreview] = useState();
    
    const handleChange = (e:any) => {
        if(e.target.files) {
          const files = e.target.files;
          setFiles(files);
          const preview = [];
          for (let i=0; i<files.length; i++) {
            preview.push(URL.createObjectURL(files[i]));
          };
          setPreview(preview);
        };
    };

    const handleSubmit = () => {
        if (files) {
          props.handleSubmit(files);
        };
    };

    return (
      <div>
        <p>{props.title}</p>
        { 
          props.single? 
            <input type="file" onChange={handleChange}/> 
          :
            <input type="file" onChange={handleChange} multiple/>
        }
        <div>
          {
            preview? preview.map((image:any, index:number)=><img src={image} key={index} alt="" className="pic-m"/>) : null
          }
        </div>
        <button onClick={handleSubmit}>{props.label}</button>
      </div>
    );
};

export default FileForm;