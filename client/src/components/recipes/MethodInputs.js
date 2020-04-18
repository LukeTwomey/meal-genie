import React from "react"

const MethodInputs = (props) => {
  return (
    props.method.map((val, i)=> {
      let stepId = `step-${i}`
      return (
        <fieldset key={i}>
          <label htmlFor={stepId}>{`Step #${i + 1}`}</label>
          <input
            type="text"
            name={stepId}
            data-id={i}
            id={stepId}
            value={props.method[i].name} 
            className="step"
            onChange={props.onChange}
          />
        </fieldset>
      )
    })
  )
}

export default MethodInputs