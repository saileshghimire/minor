import React, { useState , useEffect, useRef} from 'react';
import QuestionBox from './QuestionBox';
import Questiongen from './Questiongen';

export default function Examconfirmation() {

    //for confirmation page
    const [examStart, setexamStart] = useState(false);

    //for confirmation box
    const boxStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      };
    
      const contentStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        textAlign: 'center',
      };
    
      const buttonStyle = {
        margin: '0 10px',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
      };
    
      const confirmButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'grey',
        color: '#fff',
      };
    
      const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'grey',
        color: '#fff',
      };

      const handleExamStart= () => {
            setexamStart(true); 
            console.log(examStart);
      }

      const handleExamAbort= () => {
        setexamStart(false); 
      }

    //Timer

      // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('02:00:00');
  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('02:00:00');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 7200);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
  
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
      clearTimer(getDeadTime());
  }
  
  const  [examOver, setexamOver] = useState(false);

  const examFinished = () => {
      setexamOver(true);
  }

  if (examOver === "00:00:00"){
      setexamOver(true);
  }

      
    return(
        <div>
        {(!examStart && !examOver) && (
        <>
        <div style={boxStyle}>
        <div style={contentStyle}>
          <h3>Are you sure you are ready to take the exam?</h3>
          <div>
            <button style={confirmButtonStyle} onClick={handleExamStart} >
              Yes, I am ready
            </button>
            <button style={cancelButtonStyle} onClick={handleExamAbort}>
              Return back
            </button>
          </div>
        </div>
      </div> 
      </>)}
      {(examStart && !examOver) &&
        (<>
            <button type="button" class="btn btn-primary position-fixed" style={{bottom: 50, right:20, zIndex: 101}} onClick ={examFinished}>Submit</button>

            <div className="position-fixed"  style={{bottom: 0, right:0, zIndex: 101, backgroundColor: "grey"}}>
                <h2>{timer} </h2> 
            </div>
      <Questiongen />

      </>)}

      {examOver &&
      (
        <h1>The exam is finished.</h1>
      )}
      </div>
    )
}
