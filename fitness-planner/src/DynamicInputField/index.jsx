import React, { useState, Fragment } from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { useEffect } from 'react';
import { useRef } from 'react';

const DynamicInputField = ({
  day,
  setDay1,
  setDay2,
  setDay3,
  setDay4,
  setDay5,
  setDay6,
  setDay7,
  dayValue,
  setButtonActive,
}) => {
  const [inputFields, setInputFields] = useState(
    dayValue ? [...dayValue] : ['']
  );

  useEffect(() => {
    if (day === '1') {
      setDay1(inputFields);
    } else if (day === '2') {
      setDay2(inputFields);
    } else if (day === '3') {
      setDay3(inputFields);
    } else if (day === '4') {
      setDay4(inputFields);
    } else if (day === '5') {
      setDay5(inputFields);
    } else if (day === '6') {
      setDay6(inputFields);
    } else if (day === '7') {
      setDay7(inputFields);
    }
  }, [
    day,
    inputFields,
    setDay1,
    setDay2,
    setDay3,
    setDay4,
    setDay5,
    setDay6,
    setDay7,
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push('');
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const videoRef = useRef('');
  const exerciseRef = useRef('');
  const [inputError, setInpurError] = useState(true);
  const handleInputChange = (index, event, video) => {
    if (videoRef.current.value !== '' || exerciseRef.current.value !== '') {
      setInpurError(false);
    } else {
      setInpurError(true);
    }
    // if (videoRef.current.value !== null && videoRef.current.value !== '') {
    //   console.log('1');
    //   const values = [...inputFields];
    //   values[index] = {
    //     exercise: exerciseRef.current.value,
    //     video: videoRef.current.value,
    //   };
    //   setInputFields(values);
    // } else {
    //   const values = [...inputFields];
    //   values[index] = exerciseRef.current.value;
    //   setInputFields(values);
    //   console.log('2');
    // }
    const values = [...inputFields];
    values[index] = {
      exercise: exerciseRef.current.value,
      video: videoRef.current.value,
    };
    setInputFields(values);
  };
  console.log(inputFields);
  return (
    <form className="day">
      Day {day}
      {inputError ? (
        <Alert variant={'danger'}>
          You must enter exericese explanation or video link!
        </Alert>
      ) : null}
      <div className="form-row">
        {inputFields.map((inputField, index) => (
          <Fragment key={index}>
            <div className="form-group col-sm-6 exercise-wrapper">
              <label htmlFor="day">Exercise {index + 1}</label>
              <textarea
                type="text"
                className="form-control"
                id="exercise"
                name="exercise"
                onChange={(event) => handleInputChange(index, event)}
                ref={exerciseRef}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Video Example"
                onChange={(e) => handleInputChange(index, e, e.target.value)}
                ref={videoRef}
              />
            </div>
            <div className="form-group col-sm-2">
              {index === 0 ? (
                <button
                  className="custom-add"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              ) : null}
              {index > 0 ? (
                <button
                  className="custom-remove"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
              ) : null}
            </div>
          </Fragment>
        ))}
      </div>
    </form>
  );
};

export default DynamicInputField;
