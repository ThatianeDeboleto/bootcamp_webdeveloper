const displayDate = () => {
    let date = new Date();
    let year = date.getYear();
    let dayOfMonth = date.getUTCDate();

    const optionsDay = {weekday: 'short'};
    const optionsMonth = {month: 'short'};

    let d = new Intl.DateTimeFormat('smj-NO', optionsDay).format(date);
    let m = new Intl.DateTimeFormat('smj-NO', optionsMonth).format(date);

    let h2 = document.querySelector('h2');
    h2.textContent = `${d} ${dayOfMonth}. ${m} ${year-100}`;
};

const displayDigitalTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let mins = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    let secs = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();
    let hrs = (hours < 10) ? '0' + hours.toString() : hours.toString();

    let h3 = document.querySelector('h3');
    h3.textContent = `${hrs} : ${mins} : ${secs}`;
};

const displaySeconds = () => {
    const secHand = document.querySelector('.second-hand');

    let date = new Date();
    let seconds = date.getSeconds();
    let secondsDegrees = ((seconds / 60) * 360) + 90;

    secHand.style.transform = `rotateZ(${secondsDegrees}deg)`;
};

const displayMinutes = () => {
    const minsHand = document.querySelector('.min-hand');

    let date = new Date();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let minsDegrees = ((mins / 60) * 360) + ((secs / 60) * 6) + 90 ;

    minsHand.style.transform = `rotateZ(${minsDegrees}deg)`;
};

const displayHours = () => {
    const hourHand = document.querySelector('.hour-hand');

    let date = new Date();
    let hour = date.getHours();
    let mins = date.getMinutes();
    let hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;

    hourHand.style.transform = `rotateZ(${hourDegrees}deg)`;
};

const callAllFunctions = () => {
    displayDate();
    displayDigitalTime();
    displaySeconds();
    displayMinutes();
    displayHours();
};

setInterval(callAllFunctions, 1000);

callAllFunctions();