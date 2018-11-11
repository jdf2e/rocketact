/**
 * ensuring that the trailing slash exists and only 1 slash exists
 *
 * @param originalString
 */
const ensureTrailingSlash = (originalString: string): string => {
  return `${originalString}/`.replace(/\/+/, "/");
};

export { ensureTrailingSlash };
