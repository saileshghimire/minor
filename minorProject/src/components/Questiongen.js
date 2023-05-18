import React, { useState } from 'react';
import { quizData } from './quizData';
import QuestionBox from './QuestionBox';


export default function Questiongen() {
    return(
        <div>
            {
        quizData.map((question) => {
            return(
                <QuestionBox item={question}/>
            )
        })
    }
        </div>
    
)}