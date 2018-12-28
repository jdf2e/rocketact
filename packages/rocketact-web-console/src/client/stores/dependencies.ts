import {
  observable,
  computed,
  action,
  runInAction,
  extendObservable,
  entries,
  set
} from "mobx";

import semver from "semver";

import { IDependency } from "../../server/dependenciesAPI";
import { getDependencies, getNPMPackageDetail, IPackageDetail } from "../api";

const packageDetailCache: { [key: string]: IPackageDetail } = {};

function getNPMPackageDetailWithCache(name: string): Promise<IPackageDetail> {
  if (packageDetailCache[name]) {
    return Promise.resolve(packageDetailCache[name]);
  } else {
    return getNPMPackageDetail(name).then(detail => {
      packageDetailCache[name] = detail;

      return detail;
    });
  }
}

export interface IDependencyStore {
  main: IDependency[];
  dev: IDependency[];
  loading: boolean;
  all: IDependency[];
  refresh: () => void;
  version: number;
  remove: (name: string) => void;
}

const store = observable(
  {
    main: [],
    dev: [],
    loading: false,
    version: 0,

    get all(): IDependency[] {
      return [...this.main, ...this.dev];
    },

    remove(name) {
      this.main = this.main.filter(p => p.id !== name);
      this.dev = this.dev.filter(p => p.id !== name);
    },

    refresh() {
      this.loading = true;
      getDependencies().then(
        result => {
          runInAction(() => {
            this.loading = false;
            this.main = result.main;
            this.dev = result.dev;
            this.all.forEach(p => {
              getNPMPackageDetailWithCache(p.id).then(detail => {
                runInAction(() => {
                  let wanted: string | undefined;
                  detail.versions.forEach((version: string) => {
                    if (
                      semver.valid(version) &&
                      semver.satisfies(version, p.range)
                    ) {
                      if (!wanted) {
                        wanted = version;
                      } else if (semver.gt(version, wanted)) {
                        wanted = version;
                      }
                    }
                  });

                  set(p, {
                    description: detail.description,
                    homepage: detail.homepage,
                    next: detail["dist-tags"].next,
                    latest: detail["dist-tags"].latest
                  });

                  if (wanted) {
                    set(p, { wanted });
                  }

                  this.version++;
                });
              });
            });
          });
        },
        () => {
          runInAction(() => {
            this.loading = false;
          });
        }
      );
    }
  } as IDependencyStore,
  {
    refresh: action
  }
);

store.refresh();
export default store;
