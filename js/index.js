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

const myCalendar = {
  header: "五月廿九 乙亥年 【猪年】 庚午月 乙亥日",
  "month-zh": "七月",
  "month-en": "JULY",
  week: "周一",
  day: 1,
  title: "忌大而无当",
  quote:
    "如果我还有什么剩下要做的事情，那就是一棵草的事情，一粒虫的事情，一片云的事情。",
  from: "作家，刘亮程 《一个人的村庄》",
  logo: "喵喵日历"
};

const tpl = `
<div id="header" class="cal-header">
    {{header}}
</div>
<div id="body" class="cal-body">
    <div class="cal-month-week">
        <div id="month-zh" class="cal-month-zh">
            {{month-zh}}
        </div>
        <div id="month-en" class="cal-month-en">
            {{month-en}}
        </div>
        <div id="week" class="cal-week">
            {{week}}
        </div>
    </div>
    <div id="day" class="cal-day">
        {{day}}
    </div>
    <div id="title" class="cal-title">
        {{title}}
    </div>
</div>
<div id="footer" class="cal-footer">
    <div id="quote" class="cal-quote">
        {{quote}}
    </div>
    <div>
    <div id="from" class="cal-from">
        {{from}}
    </div>
    <div id="logo" class="cal-logo">{{logo}}</div>
    </div>
</div>
`;

function init() {
  const container = document.getElementById("calendar-container");
  const content = template(tpl, myCalendar);
  container.innerHTML = content;
}
