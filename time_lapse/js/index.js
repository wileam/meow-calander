window.onload = init;

function template(tpl, option = {}) {
  if (tpl && typeof tpl === "string") {
    const regx = /{{([a-zA-Z\-]+)}}/g;
    return tpl.replace(regx, (...argv) => {
      return option[argv[1]];
    });
  } else {
    return tpl;
  }
}
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function formatMonth(month, text, hideMonth = false) {
  let className = "cal-month";
  if (hideMonth && new Date().getMonth() > month) {
    className += " past";
  }
  return `<div class="${className}">${text}</div>`;
}
function formatDay(month, day) {
  let className = "cal-day";
  let today = new Date();
  if (
    today.getMonth() > month ||
    (today.getMonth() === month && today.getDate() > day)
  ) {
    className += " past";
  }
  return `<div class="${className}">${day}</div>`;
}
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function getContent(year) {
  var ret = [];
  for (let i = 0; i < 12; i++) {
    ret.push(formatMonth(i, MONTHS[i]));
    const days = daysInMonth(i, year);
    for (let j = 0; j < days; j++) {
      ret.push(formatDay(i, j + 1));
    }
  }
  return ret;
}
function init() {
  const container = document.getElementById("body");
  const content = getContent(2019).join("");
  container.innerHTML = content;
}
