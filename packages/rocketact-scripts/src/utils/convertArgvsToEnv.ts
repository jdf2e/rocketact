import minimist = require("minimist");

const optionNameToEnvironmentName = (name: string): string => {
  return name
    .split("-")
    .map(part => part.toUpperCase())
    .join("_");
};

/**
 * convert ParsedArgs options to environment value pairs
 *
 * For example:
 *
 * | in commandline   |     after minimist     |  after this function |
 * |:----------:|:-------------:|:------:|
 * | --no-hash |  {hash: false} | {NO_HASH: "true"} |
 * | --xxx abc |    {xxx: "abc"}   |   {XXX: "abc"} |
 *
 * @param argvs minimist.ParsedArgs from minimist
 */
export default function convertArgvsToEnv(
  argvs: minimist.ParsedArgs
): { [index: string]: string } {
  const { _: _, "--": thingsAfterDoubleDash, ...options } = argvs;
  const result: { [index: string]: string } = {};

  Object.keys(options).forEach(key => {
    const value = options[key];
    if (value === false || value === "false") {
      result[optionNameToEnvironmentName(`no-${key}`)] = "true";
    } else {
      result[optionNameToEnvironmentName(key)] = value;
    }
  });

  return result;
}
