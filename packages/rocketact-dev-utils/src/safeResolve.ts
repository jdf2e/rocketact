import { appRoot } from "./paths";
import { ensureTrailingSlash } from "./ensureTrailingSlash";

/**
 * resolve a package name to fully qualified path, supports [PnP](https://yarnpkg.com/lang/en/docs/pnp/)
 *
 *  See: [angular/angular-cli#12465 (comment)](https://github.com/angular/angular-cli/issues/12465#issuecomment-426796359)
 *
 * @param pkg the package name which you'd resolve to the real path
 */
export function safeResolve(pkg: string): string {
  if ((process.versions as any).pnp) {
    // tslint:disable-next-line:no-implicit-dependencies
    const pnpapi = require("pnpapi");
    return pnpapi.resolveRequest(pkg, ensureTrailingSlash(appRoot()), {
      extensions: Object.keys(require.extensions)
    });
  } else {
    return require.resolve(pkg, { paths: [appRoot()] });
  }
}
