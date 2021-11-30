var sound = new Audio();
sound.src = "alarm.mp3";
var timer;
var timer = document.getElementById("timer");

function showTime() {
  var now = new Date();
  currentTime = now.toLocaleTimeString();
  timer.textContent = currentTime;
  setTimeout(showTime, 1000);
}

showTime();

function setAlarm(el) {
  var time = document.getElementById("alarmTime").valueAsNumber;
  if (isNaN(time)) {
    alert("Invalid DateTime");
    return;
  }

  var alarm = new Date(time);
  var alarmTime = new Date(
    alarm.getUTCFullYear(),
    alarm.getUTCMonth(),
    alarm.getUTCDate(),
    alarm.getUTCHours(),
    alarm.getUTCMinutes(),
    alarm.getUTCSeconds()
  );
  var duration = alarmTime.getTime() - new Date().getTime();

  if (duration < 0) {
    alert("Time is already passed");
    return;
  }

  timer = setTimeout(initAlarm, duration);
  el.innerHTML = " Cancel Alarm";
  el.setAttribute("onclick", "cancelAlarm(this);");
  el.setAttribute("class", "btn btn-danger");
}

function cancelAlarm(el) {
  el.innerHTML = "Set Alarm";
  el.setAttribute("onclick", "setAlarm(this);");
  el.setAttribute("class", "btn btn-success");
  clearTimeout(timer);
}

function initAlarm() {
  sound.loop = true;
  sound.play();
  document.getElementById("alarmButton").style.display = "none";
  document.getElementById("selectButton").style.display = "";
}

function stopAlarm() {
  sound.pause();
  sound.currentTime = 0;
  document.getElementById("selectButton").style.display = "none";
  cancelAlarm(document.getElementById("alarmButton"));
  document.getElementById("alarmButton").style.display = "";
}

function snoozeAlarm() {
  stopAlarm();
  setTimeout(initAlarm, 300000);
  button.innerText = "Cancel Alarm";
  button.setAttribute("onclick", "cancelAlarm(this);");
}
