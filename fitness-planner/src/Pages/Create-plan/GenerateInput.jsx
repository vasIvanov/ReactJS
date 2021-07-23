import React, { Fragment } from 'react';
import DynamicInputField from '../../Components/DynamicInputField';

const GenerateInput = ({
  setButtonActive,
  editPlan,
  days,
  setDay1,
  setDay2,
  setDay3,
  setDay4,
  setDay5,
  setDay6,
  setDay7,
}) => {
  return (
    <Fragment>
      {days === '2' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={
              (editPlan && editPlan.exercises && editPlan.exercises.day1) || ''
            }
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={
              (editPlan && editPlan.exercises && editPlan.exercises.day2) || ''
            }
            day={'2'}
            setDay2={setDay2}
          />
        </div>
      ) : null}
      {days === '3' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={
              (editPlan && editPlan.exercises && editPlan.exercises.day1) || ''
            }
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={
              (editPlan && editPlan.exercises && editPlan.exercises.day2) || ''
            }
            day={'2'}
            setDay2={setDay2}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={
              (editPlan && editPlan.exercises && editPlan.exercises.day3) || ''
            }
            day={'3'}
            setDay3={setDay3}
          />
        </div>
      ) : null}
      {days === '4' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1}
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2}
            day={'2'}
            setDay2={setDay2}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3}
            day={'3'}
            setDay3={setDay3}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4}
            day={'4'}
            setDay4={setDay4}
          />
        </div>
      ) : null}
      {days === '5' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1}
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2}
            day={'2'}
            setDay2={setDay2}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3}
            day={'3'}
            setDay3={setDay3}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4}
            day={'4'}
            setDay4={setDay4}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5}
            day={'5'}
            setDay5={setDay5}
          />
        </div>
      ) : null}
      {days === '6' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1}
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2}
            day={'2'}
            setDay2={setDay2}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3}
            day={'3'}
            setDay3={setDay3}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4}
            day={'4'}
            setDay4={setDay4}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5}
            day={'5'}
            setDay5={setDay5}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day6}
            day={'6'}
            setDay6={setDay6}
          />
        </div>
      ) : null}
      {days === '7' ? (
        <div className="days-table">
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day1}
            day={'1'}
            setDay1={setDay1}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day2}
            day={'2'}
            setDay2={setDay2}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day3}
            day={'3'}
            setDay3={setDay3}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day4}
            day={'4'}
            setDay4={setDay4}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day5}
            day={'5'}
            setDay5={setDay5}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day6}
            day={'6'}
            setDay6={setDay6}
          />
          <DynamicInputField
            setButtonActive={setButtonActive}
            dayValue={editPlan && editPlan.exercises && editPlan.exercises.day7}
            day={'7'}
            setDay7={setDay7}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default GenerateInput;
