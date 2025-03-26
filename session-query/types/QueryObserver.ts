import { QueryKey, QueryOptions, QueryResult } from "./utils";
import { Query, QueryState } from "./Query";
import { QueryClient } from "./QueryClient";

export interface QueryObserverOptions<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
> extends QueryOptions<TData, TError, TQueryKey> {
  enabled?: boolean;
  select?: (data: TData) => TData;
  notifyOnChangeProps?: string[] | "all" | "tracked";
}

export interface QueryObserverListener<TData = unknown, TError = Error> {
  (result: QueryResult<TData, TError>): void;
}

export interface QueryObserver<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
> {
  options: QueryObserverOptions<TData, TError, TQueryKey>;
  client: QueryClient;
  query: Query<TData, TError, TQueryKey> | undefined;
  listeners: Set<QueryObserverListener<TData, TError>>;
  currentResult: QueryResult<TData, TError>;

  constructor(
    client: QueryClient,
    options: QueryObserverOptions<TData, TError, TQueryKey>
  ): QueryObserver<TData, TError, TQueryKey>;

  subscribe(listener: QueryObserverListener<TData, TError>): () => void;
  unsubscribe(listener: QueryObserverListener<TData, TError>): void;
  setOptions(options: QueryObserverOptions<TData, TError, TQueryKey>): void;
  getCurrentResult(): QueryResult<TData, TError>;
  getOptimisticResult(
    options: QueryObserverOptions<TData, TError, TQueryKey>
  ): QueryResult<TData, TError>;
  updateResult(): void;
  onQueryUpdate(): void;
  getResult(): QueryResult<TData, TError>;
  createResult(
    query: Query<TData, TError, TQueryKey>,
    state: QueryState<TData, TError>
  ): QueryResult<TData, TError>;
}
