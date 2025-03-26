// 유틸리티 타입 정의
export type QueryKey = string | readonly unknown[];

export type QueryStatus = "idle" | "loading" | "error" | "success";

export type QueryFunction<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey
> = (queryKey: TQueryKey) => TData | Promise<TData>;

export interface QueryOptions<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
> {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TData, TQueryKey>;
  staleTime?: number;
  gcTime?: number;
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((failureCount: number, error: TError) => number);
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
}

export interface QueryResult<TData = unknown, TError = Error> {
  data: TData | undefined;
  error: TError | null;
  status: QueryStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
}
