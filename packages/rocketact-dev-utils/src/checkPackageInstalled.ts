import { appRoot } from "./paths";

const checkPackageInstalled = (packageName: string): boolean => {
  let installed = true;

  try {
    require.resolve(packageName, { paths: [appRoot()] });
  } catch (e) {
    installed = false;
  }

  return installed;
};

export { checkPackageInstalled };
