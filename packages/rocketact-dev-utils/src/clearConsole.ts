import readline from "readline";

const clearConsole = () => {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

export { clearConsole };
