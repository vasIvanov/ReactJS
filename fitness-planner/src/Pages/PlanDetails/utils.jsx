import React from 'react';

export const renderData = (plan) => {
  let header = Object.keys(plan.exercises);
  return header.map((key, index) => {
    return (
      <div className="plan-days" key={index}>
        <h5>Day {key.toUpperCase().split('DAY')[1]}</h5>
        {plan.exercises[key].map((e, i) => {
          if (typeof plan.exercises[key][i] === 'string') {
            return (
              <p className="exercice" key={i}>
                {e.split('Example')[0]}
                {e.includes('Example') ? (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={e.split('Example')[1]}
                    className="example"
                  >
                    Watch Example
                  </a>
                ) : null}
              </p>
            );
          } else {
            return (
              <p className="exercice" key={i}>
                {e.exercise} <br></br>
                {e.video ? (
                  <a
                    className="example"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={e.video}
                  >
                    Watch Example
                  </a>
                ) : null}
              </p>
            );
          }
        })}
      </div>
    );
  });
};
