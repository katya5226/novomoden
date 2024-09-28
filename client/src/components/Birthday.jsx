import React from 'react';
import '../App.css';

const makeSelectYear = () => {
    var yearArr = [];
    for (let i = 0; i < 100; i++) {
        yearArr.push(1910 + i);
    }
return yearArr.map((year) => <option value={year.toString()} key = {year}>{year}</option>)
}

const makeSelectDay = () => {
    var yearArr = [];
    for (let i = 1; i < 32; i++) {
        yearArr.push(i);
    }
return yearArr.map((day) => <option value={day.toString()} key = {day}>{day + '.'}</option>)
}

const warnStyle = {
    border: '1px solid red'
}

const Birthday = (props) => {

    return (
        <div>
            <select name="day" id="day" value={props.day} onChange={props.onChange}
                style={(!props.day && props.saveAttempt===true)  ? warnStyle : null}>
                <option value="0">Dan rojstva</option>
                {makeSelectDay()}
            </select>
            <select name="month" id="month" value={props.month} onChange={props.onChange}
                style={(!props.month && props.saveAttempt===true)  ? warnStyle : null}>
                <option value="0">Mesec rojstva</option>
                <option value="1">Januar</option>
                <option value="2">Februar</option>
                <option value="3">Marec</option>
                <option value="4">April</option>
                <option value="5">Maj</option>
                <option value="6">Junij</option>
                <option value="7">Julij</option>
                <option value="8">Avgust</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <select name="year" id="year" value={props.year} onChange={props.onChange}
                style={(!props.year && props.saveAttempt===true)  ? warnStyle : null}>
                <option value="0">Leto rojstva</option>
                {makeSelectYear()}
            </select>
        </div>
    )
}

export default Birthday;