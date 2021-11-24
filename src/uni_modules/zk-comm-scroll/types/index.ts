export interface CallLoadMoreType {
  done: Function;
  page: number;
  size: number;
}

export enum ReeshStatusType {
  DONE,
  NONE,
  FRESH_LOADING,
}
