import React, { useState, Fragment, useContext } from "react";
// undo end point
import "bootstrap/dist/css/bootstrap.css";
import './index.css'
import {planContext} from '../planContext';

const Test = ({day, setDay1, setDay2, setDay3, setDay4,setDay5, setDay6, setDay7, className}) => {
  const [inputFields, setInputFields] = useState(['']);
  const [clicked, setClicked] = useState(false);
  const planValue = useContext(planContext);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push('');
    setInputFields(values);
    planValue.setButtonActive(false);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    planValue.setButtonActive(false);
    setClicked(false);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setClicked(false);
    setInputFields(values);
    planValue.setButtonActive(false)
  };

  const handleSubmit = (e) => {
    setClicked(true);
    e.preventDefault();
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
  }


  return (
      <form className='day' onSubmit={handleSubmit}>
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

                {index > 0 ? <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button> : null}

                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          {clicked ? <div>
            <button
            className="btn btn-primary mr-2 clicked"
            type="submit"
            onSubmit={handleSubmit}
          >
            Saved 
          </button> 
          </div> 
          : 
          <button
          className="btn btn-primary mr-2"
          type="submit"
          onSubmit={handleSubmit}
        >
          Save
        </button>
          }
        </div>
      </form>
  );
};

export default Test;