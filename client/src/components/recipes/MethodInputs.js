import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";

const MethodInputs = (props) => {
  return props.method.map((val, i) => {
    let stepId = `step-${i}`;
    return (
      <div className="methodContainer" key={i}>
        <fieldset key={i}>
          <label htmlFor={stepId}>{`Step ${i + 1}`}</label>
          <textarea
            rows="5"
            name={stepId}
            data-id={i}
            id={stepId}
            value={props.method[i].step}
            className="step"
            onChange={props.onChange}
          />
        </fieldset>
        <div className="deleteButton" data-id={i} onClick={props.deleteStep}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    );
  });
};

export default MethodInputs;
