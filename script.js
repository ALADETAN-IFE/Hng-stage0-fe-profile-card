const updateTime = () => {
  const timeElement = document.getElementById('user-time');
  timeElement.textContent = Date.now();
}

updateTime();

setInterval(updateTime, 1000);
