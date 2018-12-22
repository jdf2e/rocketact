// const { Subject, Observable } = require("rxjs");
import { Subject, Observable, from } from "rxjs";
import semver from "semver";
import {
  debounceTime,
  switchMap,
  distinctUntilChanged,
  map,
  filter
} from "rxjs/operators";

import * as API from "../api";

export interface ISearchParams {
  keyword: string;
  page: number;
}

class SearchService {
  searchTerm: Subject<ISearchParams>;

  constructor() {
    this.searchTerm = new Subject();
  }

  doSearch(params: ISearchParams) {
    return from(API.searchNPM(params.keyword, params.page));
  }

  search(params: ISearchParams) {
    this.searchTerm.next(params);
  }

  getResults(): Observable<API.ISearchResult> {
    return this.searchTerm
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(term => (term ? this.doSearch(term) : from([]))));
  }
}

export default SearchService;
