/**
 * ensuring that the trailing slash is removed
 *
 * @param originalString
 */
const removeTrailingSlash = (originalString: string): string => {
  return `${originalString}/`.replace(/\/+$/, "");
};

export { removeTrailingSlash };
