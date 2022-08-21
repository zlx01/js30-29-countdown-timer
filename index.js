let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // 秒数显示两位
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour;
  const minutes = end.getMinutes();
  // 分钟数显示两位
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

buttons.forEach(button => button.addEventListener('click', function (e) {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}));
document.customForm.addEventListener('submit', function (e) {
  // 阻止表单提交
  e.preventDefault();
  // 获取表单中的值
  const mins = this.minutes.value;
  if (mins < 1 || mins > 60) {
    alert('请输入1-60之间的数字');
    return
  }

  timer(mins * 60);
  // 清空表单
  this.reset();
});
