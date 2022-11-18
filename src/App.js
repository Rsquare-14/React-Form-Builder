import './App.css';
import { ReactFormBuilder } from "react-form-builder2"
import "react-form-builder2/dist/app.css"
import { useState } from 'react';

const initialFormData = {
  formData : [],
  indexPosition : -1,
  id: 0
}

function App() {
  const [formDetails, setFormDetails] = useState(initialFormData);

  const loadData = () => {
    if(formDetails.formData.length>0){
      return new Promise ((resolve) => {
        resolve(JSON.stringify(formDetails.formData[formDetails.indexPosition]))
      }).then((response) => {
        return JSON.parse(response).task_data 
      });
    }
  } 

  const postData = (data) => {
    setFormDetails((prevData) => {
      return {
        formData : [...prevData.formData, data],
        indexPosition : prevData.indexPosition+1,
        id : prevData.id+1
      }
    })
  }

  const undo = () => {
    if(formDetails.indexPosition>-1){
      setFormDetails((prevDetails) => {
        return {
          formData : prevDetails.formData,
          indexPosition : prevDetails.indexPosition-1,
          id : prevDetails.id+1
        }
      })
    }else{
      return
    }
  }

  const redo = () => {
    if(formDetails.indexPosition<formDetails.formData.length-1){
      setFormDetails((prevDetails) => {
        return {
          formData : prevDetails.formData,
          indexPosition : prevDetails.indexPosition+1,
          id : prevDetails.id+1
        }
      })
    }else{
      return
    }
  }

  const downloadJSON = () => {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formDetails.formData[formDetails.formData.length - 1]));
    let anchorEl = document.createElement("a");
    anchorEl.setAttribute("href", dataStr);
    anchorEl.setAttribute("download", "formData.json");
    anchorEl.click();
  }

  return (
    <div>
      <button className='btn btn-primary undo-btn' onClick={undo}>Undo</button>
      <button className='btn btn-primary redo-btn' onClick={redo}>Redo</button>
      <button className='btn btn-primary download-json' onClick={downloadJSON}>Download JSON</button>
      {formDetails.formData.length>0 ? 
      <ReactFormBuilder
        onLoad={loadData}
        onPost={postData}
        key = {formDetails.id}
      /> : 
      <ReactFormBuilder
      onPost={postData}
      key = {formDetails.id}
    />}
    </div>
  );
}

export default App;
