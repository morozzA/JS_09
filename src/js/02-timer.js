import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');


let timerId = null;

const optionsFlatpickr = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentDate = selectedDates[0];
        if (new Date() >= currentDate) {
            Notiflix.Report.failure("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
        }
    }};
    
startBtn.disabled = true;
    
flatpickr(datetimePicker, optionsFlatpickr);
let currentDate = null;

startBtn.addEventListener('click', startTimer);

function startTimer(e) {
    clearInterval(timerId);
    let time = currentDate - new Date();
    timerId = setInterval(() => {
        if (Math.floor(time / 1000) <= 0) {
            clearInterval(timerId);
        }
        
        daysValue.textContent = addLeadingZero(convertMs(time).days);
        hoursValue.textContent = addLeadingZero(convertMs(time).hours);
        minutesValue.textContent = addLeadingZero(convertMs(time).minutes);
        secondsValue.textContent = addLeadingZero(convertMs(time).seconds);
        time -= 1000;
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}