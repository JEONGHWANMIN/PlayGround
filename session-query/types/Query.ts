import { QueryKey, QueryFunction, QueryStatus, QueryOptions } from "./utils";

export interface QueryState<TData = unknown, TError = Error> {
  data: TData | undefined;
  error: TError | null;
  status: QueryStatus;
  isFetching: boolean;
  dataUpdatedAt: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
}

export interface QueryConfig<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
> extends QueryOptions<TData, TError, TQueryKey> {
  queryHash: string;
}

export interface QueryCacheNotifyEvent<TData = unknown, TError = Error> {
  type: "queryUpdated" | "queryRemoved";
  query: Query<TData, TError>;
}

export interface QueryObserverListener<TData = unknown, TError = Error> {
  (event: QueryCacheNotifyEvent<TData, TError>): void;
}

export interface Query<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
> {
  readonly queryKey: TQueryKey;
  readonly queryHash: string;
  readonly queryFn: QueryFunction<TData, TQueryKey>;
  readonly config: QueryConfig<TData, TError, TQueryKey>;
  state: QueryState<TData, TError>;
  cacheTime: number;
  observers: Set<QueryObserverListener<TData, TError>>;

  fetch(): Promise<TData>;
  setData(data: TData): void;
  setState(state: Partial<QueryState<TData, TError>>): void;
  addObserver(observer: QueryObserverListener<TData, TError>): void;
  removeObserver(observer: QueryObserverListener<TData, TError>): void;
  destroy(): void;
}
