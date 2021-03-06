import React, { Component } from 'react'
import {moment} from '../moment-custom.js'

import Day from './Day'
import classes from './Calendar.module.scss'

export default class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };


  prevMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).subtract(1, 'M')
    });
  }

  nextMonth = () => {
    this.setState(state => ({
      currentMonth: moment(state.currentMonth).add(1, 'M')
    }));
  }

  selectDateHandler = (date) => {
    this.setState({
      selectedDate: date
    })
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
  
    let startDate = moment(this.state.currentMonth).startOf('week');
  
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {moment(startDate).add(i, 'd').format(dateFormat)}
        </div>
      );
    }
  
    return <div className={classes.daysNames}>{days}</div>;
  }


  renderMonthDays = () => {
    const { currentMonth, selectedDate } = this.state;
    const days = []
    const monthStart = moment(currentMonth).startOf('month');
    const monthStartDayName = moment(currentMonth).startOf('month').day();
    const monthEnd = moment(currentMonth).endOf('month').date();
    // const now = moment.now()
    let startDate = moment(currentMonth).startOf('week')
    const startWeekdayDayName = moment(currentMonth).startOf('week').day()

    const endDate =  moment(currentMonth).endOf('week')
    const endWeekdayDayName =  moment(currentMonth).endOf('month').day();
    // console.log( endWeekdayDayName)

    //adding days from prev month
    let prevMonthDays = monthStartDayName - startWeekdayDayName
    // debugger
    if (prevMonthDays === -1) {
      startDate = moment(currentMonth).subtract(1, 'd').startOf('week')
      prevMonthDays = 7 - startWeekdayDayName
    }
    console.log(startDate.date(), prevMonthDays)
    for (let i = 0; i < prevMonthDays; i++) {
      const date = moment(startDate).add(i, 'd')
      console.log(date)
      days.push(
        <div className={`${classes.day} ${classes.otherMonthDay}`} key={date.format()} onClick={this.prevMonth}>
          {date.format('D')}
        </div>
      )
    }
    //days for current month
    for (let i = 0; i < monthEnd; i++) {
      const date = moment(monthStart).add(i, 'd')
      const active = moment(selectedDate).format('MMMM D') === moment(date).format('MMMM D')
        
      
      days.push(
        <div 
          className={`${classes.day} ${classes.currentMonthDay} ${active ? classes.active : ''}`} 
          key={date.format()}
          onClick={() => this.selectDateHandler(date)}
        >
          {date.format('D')}
        </div>
      )
    }
    //days for next month
    if (endWeekdayDayName === 0) {
      return days
    }
    const remainingDays = 7 - endWeekdayDayName
    // console.log(monthEnd)
    for (let i = 0; i < remainingDays; i++) {
      const date = moment(monthEnd).add(i, 'd')
      days.push(
        <div  className={`${classes.day} ${classes.otherMonthDay}`} key={date.format()} onClick={this.nextMonth}>
          {date.format('D')}
        </div>
      )
    }
    // console.log(days)
    return days
  }
  
  

  render() {
    return (
      <div className={classes.Calendar}>
        <header className={classes.header}>
          <button className={classes.changeMonth} onClick={this.prevMonth}>Prev</button>
          <span className={classes.month}>
            {moment(this.state.currentMonth).format("MMMM YYYY")}
          </span>
          <button onClick={this.nextMonth}>Next</button>
        </header>
        {this.renderDays()}
        {this.renderMonthDays()}
      </div>
    )
  }
}
