import chalk from "chalk";

const error = (content: string) => chalk.red(content);
const success = (content: string) => chalk.green(content);
const warning = (content: string) => chalk.yellow(content);
const info = (content: string) => chalk.blue(content);

const errorBlock = (content: string) => chalk.bgRed.black(content);
const successBlock = (content: string) => chalk.bgGreen.black(content);
const warningBlock = (content: string) => chalk.bgYellow.black(content);
const infoBlock = (content: string) => chalk.bgBlue.black(content);
const normalBlock = (content: string) => chalk.bgWhite.black(content);

export {
  error,
  success,
  warning,
  info,
  errorBlock,
  successBlock,
  warningBlock,
  infoBlock,
  normalBlock
};
