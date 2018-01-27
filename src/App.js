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
      todayYear: 0,
      eventActive: false
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
    let s = this.state;
    if(s.month === 11){
      this.setState({
        year: s.year + 1,
        month: 0
      });
    } else {
      this.setState({
        month: s.month + 1
      });
    }
  }
  prevMonth(){
    let s = this.state;
    if(s.month === 0){
      this.setState({
        year: s.year - 1,
        month: 11
      });
    } else {
      this.setState({
        month: s.month - 1
      });
    }
  }
  isCurrentDayCell(date){
    let s = this.state;
    if(
      date === s.todayDate &&
      s.month === s.todayMonth &&
      s.year === s.todayYear ) {
      return true;
    }
    return false;
  }
  activateCell(d){
    let y = this.state.year;
    let m = this.state.monthNamesFull[this.state.month];
    // alert('Day: ' + d + ', Month: ' + m + ', Year: ' + y);
    this.setState({
      eventActive: true
    });
  }
  deactivateCell(){
    this.setState({
      eventActive: false
    });
  }
  renderDayCells(num, start){
    let cells = []
    for(let i = 1; i <= (num + start); i++){
      if(i <= start) {
        cells.push(<div key={i} className="cell cell--blank"></div>);
      } else {
        let dayNum = i - start;
        let cellClass = "cell cell--btn";
        if(this.isCurrentDayCell(dayNum)) {
          cellClass = "cell cell--btn cell--active";
        }
        cells.push(
          <button
            key={i}
            className={cellClass}
            onClick={() => { this.activateCell(dayNum) }} >
            {dayNum}
          </button>
        );
      }
    }
    return(cells);
  }
  render() {
    let appClass = "app";
    if(this.state.eventActive){
      appClass = "app app--event"
    }
    let s = this.state;
    let minutes = s.minutes < 10 ? ('0'+s.minutes) : s.minutes;
    let secs = s.seconds < 10 ? ('0'+s.seconds) : s.seconds;
    let hours = s.hours < 12 ? s.hours : s.hours - 12;
    if(s.hours === 0){ // Midnight only...
      hours = 12;
    }
    let ampm = s.hours < 12 ? 'AM' : 'PM';
    let firstDay = this.getDayOne(s.year, s.month);
    let monthLength = s.daysInMonth[s.month];
    if (s.month === 1) { // February only...
      if ((s.year % 4 === 0 && s.year % 100 !== 0) || s.year % 400 === 0){
        monthLength = 29;
      }
    }
    return (
      <div className={appClass}>
        <header className="app__header">
          <div className="app__container">
            <h1 className="app__title">React Calendar</h1>
            <p>{s.dayNamesFull[s.todayDay] + ' ' + s.todayDate + ' ' + s.monthNames[s.todayMonth] + ' ' + s.todayYear  }</p>
            <p>{hours + ':' + minutes + ':' + secs + ' ' + ampm}</p>
          </div>
        </header>
        <main className="app__container">
          <h2 className="app__subtitle">
            {s.monthNamesFull[s.month] + ' ' + s.year} </h2>
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
              <div key={item} className="cell cell--header">{item}</div>
            ))}
            {this.renderDayCells(monthLength, firstDay)}
          </div>
          <section className="section">
            <h2>Layout Example Text</h2>
            <p>Lorem ipsum dolor sit amet, aduo id graeco molestiae incorrupte. Mel eu prima praesent facilisis, ei illum definiebas mel. Altera posidonium ei vel. Sit ridens quaeque ut, purto ancillae sapientem usu ei.</p>
            <p><a href="/">Link Here</a> | <a href="/">Link Here</a> | <a href="/">Link Here</a></p>
            <h3>Eius mei Soluta</h3>
            <p>Eius soluta at mei. Intellegebat disputationi ad pri, animal viderer duo cu. Nec ex fugit virtute repudiandae. Vis id unum audiam. </p>
            <h4>Fugit virtute</h4>
            <p>Et eam debet constituam consectetuer, eu alii dolor timeam mea.</p>
          </section>
        </main>
        <aside className="app__aside">
          <div className="modal">
            <button
              className="modal__overlay"
              onClick={() => { this.deactivateCell() }}></button>
            <div className="modal__inner">
              <button className="button" onClick={() => {
                this.deactivateCell() }} >X</button>
              <p>Modal Info</p>
            </div>
          </div>
        </aside>
        <footer className="app__footer">
          <div className="app__container">
            <p>React Calendar App - Kyle Treptow, Dec 2017</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
