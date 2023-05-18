import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function QuestionBox(props){

    const [option, setoption] = useState({
        isClicked: false,
        selectedOption: ""
    })

    const [result, setresult] = useState("");

    const handleChange = event => {
        const target = event.target
        const value = +target.value; 
        //converting to integer , the checked value is later compared to an integer

        setoption({
            isClicked: true,
            selectedOption: value
        })

        



    }


    return(
        <>
        
        <div className="question-div mx-5 my-5 pt-3">
                <div className="question" style={{fontWeight: 'bold', fontSize: 25}}>
                    {props.item.id}.{props.item.question}
                </div>
                <form>
                                <ul className="list-group list-group-horizontal my-2" style={{fontSize: 15}}>
                            <li className="list-group-item flex-fill text-start border-0">
                                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value={1} id="firstRadio" onChange={handleChange} checked={option.selectedOption === 1 ? true : false}    />
                                <label className="form-check-label" htmlFor="firstRadio">{props.item.options[0]}</label>
                            </li>
                            <li className="list-group-item flex-fill text-start border-0">
                                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value={2} id="secondRadio" onChange={handleChange} checked={option.selectedOption === 2 ? true : false} />
                                <label className="form-check-label" htmlFor="secondRadio">{props.item.options[1]}</label>
                            </li>
                            <li className="list-group-item flex-fill text-start border-0">
                                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value={3} id="thirdRadio"
                                onChange={handleChange} checked={option.selectedOption === 3 ? true : false} />
                                <label className="form-check-label" htmlFor="thirdRadio">{props.item.options[2]}</label>
                            </li>
                            <li className="list-group-item flex-fill text-start border-0">
                                <input className="form-check-input me-1" type="radio" name="listGroupRadio" value={4} id="fourthRadio"
                                onChange={handleChange} checked={option.selectedOption === 4 ? true : false} />
                                <label className="form-check-label" htmlFor="fourthRadio">{props.item.options[3]}</label>
                            </li>
                        </ul>
            </form>
            <p className="paragraph m-2">The selected option is: {option.selectedOption}</p>           
        </div>
    </>    
    )
}