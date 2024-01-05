import {useEffect, useState} from 'react';
import React from 'react';

const SECS_IN_DAY = 24 * 60 * 60;
const SECS_IN_HOUR = 60 * 60;


export function PromoBanner() {

    // Promo is on for 24 hours initially
    const [timeLeft, setTimeLeft] = useState(SECS_IN_DAY);

    return (
        <div className="alert alert-warning" role="alert">
            Our promo sale is ON for the next {toHourMinSec(timeLeft)}
        </div>
    );
}

function toHourMinSec(durationInSec: number): string {
   const hours = Math.trunc(durationInSec / SECS_IN_HOUR);
   const minutes = Math.trunc((durationInSec % SECS_IN_HOUR) / 60);
   const seconds = durationInSec - (hours * SECS_IN_HOUR) - (minutes * 60);
   return `${zeroPad(hours)}h ${zeroPad(minutes)}m ${zeroPad(seconds)}s`;
}

function zeroPad(num: number): string {
    return ('0' + num).slice(-2);
}
