// see wikipedia for detailed formula
// https://zh.wikipedia.org/wiki/%E5%B9%B2%E6%94%AF
const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DI_ZHI = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥"
];

/**
 * 天干,甲,乙,丙,丁,戊,己,庚,辛,壬,癸
 * 地支,子,丑,寅,卯,辰,巳,午,未,申,酉,戌,亥
 * @param {number} year 2019
 */
function getChineseLunarYear(year) {
  return getTianGan(year) + getDiZhi(year);
}

function getTianGan(year) {
  let tianGanIndex = (year - 3) % 10;
  tianGanIndex = tianGanIndex ? tianGanIndex : TIAN_GAN.length;
  return TIAN_GAN[tianGanIndex - 1];
}

function getDiZhi(year) {
  let diZhiIndex = (year - 3) % 12;
  diZhiIndex = diZhiIndex ? diZhiIndex : DI_ZHI.length;
  return DI_ZHI[diZhiIndex - 1];
}

const JIE_QI = [
  "12-07",
  "01-06",
  "02-04",
  "03-06",
  "04-05",
  "05-06",
  "06-06",
  "07-07",
  "08-08",
  "09-08",
  "10-08",
  "11-07"
];

const TIANGANMONTH_START_BY_TIANGANYEAR = {
  甲: 2, // "丙",
  乙: 4, // "戊",
  丙: 6, // "庚",
  丁: 8, // "壬",
  戊: 0, // "甲",
  己: 2, // "丙",
  庚: 4, // "戊",
  辛: 6, // "庚",
  壬: 8, // "壬",
  癸: 0 // "甲",
};

function getDiZhiMonthIndex(month, day) {
  let index = [month % 12]; // 12 become 0
  if (day < JIE_QI[index].split("-")[1]) {
    // index should -1
    if (index === 0) {
      index = index + 12 - 1;
    } else {
      index = index - 1;
    }
  }
  return index;
}

function getTianGanMonth(tianGan, diZhiMonthIndex) {
  let index = diZhiMonthIndex;
  if (diZhiMonthIndex > 3) {
    index = index - 2;
  }
  return TIAN_GAN[TIANGANMONTH_START_BY_TIANGANYEAR[tianGan] + index];
}

/**
 *
 * @param {string} date YYYY-MM-DD 2019-07-01
 */
function getChineseLunarMonth(date) {
  const [year, month, day] = date.split("-");
  const tianGan = getTianGan(year);
  const diZhiMonthIndex = getDiZhiMonthIndex(month, day);
  const diZhiMonth = DI_ZHI[diZhiMonthIndex];
  const tianGanMonth = getTianGanMonth(tianGan, diZhiMonthIndex);
  return tianGanMonth + diZhiMonth;
}

if (typeof require !== undefined) {
  // node env
  const assert = require("assert");
  assert.strictEqual(getChineseLunarYear(1995), "乙亥");
  assert.strictEqual(getChineseLunarYear(1861), "辛酉");
  assert.strictEqual(getChineseLunarYear(1989), "己巳");

  assert.strictEqual(getChineseLunarMonth("2019-07-01"), "庚午");
}
