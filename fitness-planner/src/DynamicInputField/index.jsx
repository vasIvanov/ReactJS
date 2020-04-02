import React, { useState, Fragment } from "react";
// undo end point
import "bootstrap/dist/css/bootstrap.css";
import './index.css'
import { useEffect } from "react";

const DynamicInputField = ({day, setDay1, setDay2, setDay3, setDay4,setDay5, setDay6, setDay7, dayValue}) => {
  const [inputFields, setInputFields] = useState(dayValue ? [...dayValue] : ['']);
  
  useEffect(() => {
    if(day === '1') {
      setDay1(inputFields)
  } else if(day === '2') {
      setDay2(inputFields)
  } else if(day === '3') {
      setDay3(inputFields);
  } else if(day === '4') {
      setDay4(inputFields);
  } else if(day === '5') {
      setDay5(inputFields);
  } else if(day === '6') {
      setDay6(inputFields);
  } else if(day === '7') {
      setDay7(inputFields);
  }
  }, [day, inputFields, setDay1, setDay2,setDay3,setDay4,setDay5,setDay6, setDay7])
  
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push('');
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };


  return (
      <form className='day'>
        Day {day}
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={index}>
              <div className="form-group col-sm-6">
                <label htmlFor="day">Exercise {index + 1}</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exercise"
                  name="exercise"
                  value={inputField}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                {index === 0 ? <button
                  className="custom-add"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button> : null}
                {index > 0 ? <button
                  className="custom-remove"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button> : null}
              </div>
            </Fragment>
          ))}
        </div>
      </form>
  );
};

export default DynamicInputField;