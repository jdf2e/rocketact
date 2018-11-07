import chalk from "chalk";

const error = (content: string) => chalk.red(content);
const success = (content: string) => chalk.green(content);
const warning = (content: string) => chalk.yellow(content);

export { error, success, warning };
