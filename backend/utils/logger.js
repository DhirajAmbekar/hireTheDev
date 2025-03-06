const color = {
  Reset: `\x1b[0m`,
  Bright: `\x1b[1m`,
  Dim: `\x1b[2m`,
  Underscore: `\x1b[4m`,
  Blink: `\x1b[5m`,
  Reverse: `\x1b[7m`,
  Hidden: `\x1b[8m`,

  FgBlack: `\x1b[30m`,
  FgRed: `\x1b[31m`,
  FgGreen: `\x1b[32m`,
  FgYellow: `\x1b[33m`,
  FgBlue: `\x1b[34m`,
  FgMagenta: `\x1b[35m`,
  FgCyan: `\x1b[36m`,
  FgWhite: `\x1b[37m`,
  // FgCrimson: "\x1b[38m",
  FgGray: `\x1b[90m`,

  BgBlack: `\x1b[40m`,
  BgRed: `\x1b[41m`,
  BgGreen: `\x1b[42m`,
  BgYellow: `\x1b[43m`,
  BgBlue: `\x1b[44m`,
  BgMagenta: `\x1b[45m`,
  BgCyan: `\x1b[46m`,
  BgWhite: `\x1b[47m`,
  // BgCrimson: "\x1b[48m",
  BgGray: `\x1b[100m`,
};
const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    // crimson: "\x1b[38m", // Scarlet
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    gray: "\x1b[100m",
    // crimson: "\x1b[48m",
  },
};

const logger_all = () => {
  Object.keys(color).map((el) => console.log(color[el] + "%s\x1b[0m", el));
};
const log_error = (txt) => {
  console.log(colours.bg.red, txt, colours.reset);
};
const log_success = (txt) => {
  console.log(colours.bg.green, txt, colours.reset);
};
const log_progress = (txt) => {
  console.log(colours.bg.yellow, txt, colours.reset);
};
const log_gscript = (txt) => {
  console.log(colours.bg.blue, txt, colours.reset);
};
const log_start = (txt) => {
  console.log(colours.bg.gray, "---- START -> " + txt + " ----", colours.reset);
};
const log_end = (txt) => {
  console.log(colours.bg.gray, "----- END -> " + txt + " -----", colours.reset);
};
const log_line = (...txt) => {
  var err = new Error();
  var caller_line = err.stack.split("\n")[2];
  var index = caller_line.indexOf("at ");
  // var clean = caller_line.slice(index + 2, caller_line.length);
  let clean = caller_line.split("(").pop();
  console.log(colours.bg.gray, clean.slice(0, -1), ...txt, colours.reset);
};

const db_err = (res, from = "not defined", err) => {
  log_error("DB Error on => " + from + " with err => " + JSON.stringify(err));
  log_end(from);
  return res.send({
    status: true,
    err: true,
    data: "DB Error",
  });
};
const key_err = (res, from, keys) => {
  log_error("Key/s not passed in => " + from + " with/out keys => " + keys);
  log_end(from);
  return res.send({
    status: false,
    err: true,
    err_msg: "keys not passed",
  });
};

module.exports = {
  logger_all,
  log_error,
  log_success,
  log_progress,
  log_gscript,
  log_start,
  log_end,
  log_line,
  //
  db_err,
  key_err,
};
