import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import style from './style.module.scss';

const Foods = () =>{
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            Router.push('/')
        }
    });

    return (
        <div className={style.foodsDiv}>
            <div>
                The food table is now on Home Page, redirecting {seconds}
            </div>
        </div>
    );
}

export default Foods;