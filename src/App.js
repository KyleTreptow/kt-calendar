import React, { Component } from 'react';
import './css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      year: 0,
      hours: 0,
      minutes: 0,
      month: 0,
      seconds: 0,
      dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      dayNamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      todayDay: 0,
      todayDate: 0,
      todayMonth: 0,
      todayYear: 0
    };
  }
  setInitDate() {
    this.setState({
      day: new Date().getDay(),
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      todayDay: new Date().getDay(),
      todayDate: new Date().getDate(),
      todayMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear(),
    });
  }
  tick() {
    this.setState({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    });
  }
  getDayOne(year, month) {
    let day1 = new Date(year, month, 1);
    let d = day1.getDay();
    return d;
  }
  componentDidMount() {
    this.setInitDate();
    this.tick();
    this.interval = setInterval(() => this.tick(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  nextMonth(){
    if(this.state.month === 11){
      this.setState({
        year: this.state.year + 1,
        month: 0
      });
    } else {
      this.setState({
        month: this.state.month + 1
      });
    }
  }
  prevMonth(){
    if(this.state.month === 0){
      this.setState({
        year: this.state.year - 1,
        month: 11
      });
    } else {
      this.setState({
        month: this.state.month - 1
      });
    }
  }
  isCurrentDayCell(dayNum){
    if(
      dayNum === this.state.todayDate &&
      this.state.month === this.state.todayMonth &&
      this.state.year === this.state.todayYear ) {
      return true;
    }
    return false;
  }
  renderDayCells(num, start){
    let cells = []
    for(let i = 1; i <= (num + start); i++){
      if(i <= start) {
        cells.push(<div className="cell cell--blank"></div>);
      } else {
        let dayNum = i - start;
        let cellClass = "cell";
        if(this.isCurrentDayCell(dayNum)) {
          cellClass = "cell cell--active";
        }
        cells.push(<div className={cellClass}> {dayNum} </div>);
      }
    }
    return(cells);
  }
  render() {
    let s = this.state;
    let minutes = s.minutes < 10 ? ('0'+s.minutes) : s.minutes;
    let secs = s.seconds < 10 ? ('0'+s.seconds) : s.seconds;
    let hours = s.hours < 12 ? s.hours : s.hours - 12;
    let ampm = s.hours < 12 ? 'AM' : 'PM';
    let firstDay = this.getDayOne(s.year, s.month);
    let monthLength = s.daysInMonth[s.month];
    if (s.month === 1) { // February only...
      if ((s.year % 4 === 0 && s.year % 100 !== 0) || s.year % 400 === 0){
        monthLength = 29;
      }
    }
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Calendar</h1>
          <p>{s.dayNamesFull[s.todayDay] + ' ' + s.todayDate + ' ' + s.monthNames[s.todayMonth] + ' ' + s.todayYear  }</p>
          <p>{hours + ':' + minutes + ' ' + ampm + ' (' + secs + ' secs)'}</p>
        </header>
        <main className="app__container">
          <h2> { s.monthNamesFull[s.month] + ' ' + s.year} </h2>
          <ul className="list list--inline">
            <li className="list__item">
              <button className="button" onClick={() => { this.prevMonth() }} >
                Prev Month
              </button>
            </li>
            <li className="list__item">
              <button className="button" onClick={() => { this.setInitDate() }} >
                Reset
              </button>
            </li>
            <li className="list__item">
              <button className="button" onClick={() => { this.nextMonth() }} >
                Next Month
              </button>
            </li>
          </ul>
          <div className="calendar">
            {s.dayNames.map((item, i) => (
              <div className="cell cell--header">{item}</div>
            ))}
            {this.renderDayCells(monthLength, firstDay)}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
