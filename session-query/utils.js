import { QueryObserver } from "./QueryObserver";

/**
 * @param {import('./types/utils').QueryKey} queryKey
 * @returns {string}
 */
export const generateQueryHash = (queryKey) => {
  return JSON.stringify(queryKey);
};

/**
 * @param {any} value
 * @returns {string}
 */
export const stableStringify = (value) => {
  if (typeof value !== "object" || value === null) {
    return JSON.stringify(value);
  }

  const sortedObj = {};
  Object.keys(value)
    .sort()
    .forEach((key) => {
      sortedObj[key] = value[key];
    });

  return JSON.stringify(sortedObj);
};

/**
 * @template TData
 * @template TError
 * @template {import('./types/utils').QueryKey} TQueryKey
 * @param {import('./types/QueryClient').QueryClient} queryClient
 * @param {import('./types/QueryObserver').QueryObserverOptions<TData, TError, TQueryKey>} options
 * @param {import('./types/QueryObserver').QueryObserverListener<TData, TError>} callback
 * @returns {{
 *   getResult: () => import('./types/utils').QueryResult<TData, TError>,
 *   unsubscribe: () => void
 * }}
 */
export const createQueryObserver = (queryClient, options, callback) => {
  const observer = new QueryObserver(queryClient, options);
  const unsubscribe = observer.subscribe(callback);

  return {
    getResult: () => observer.getResult(),
    unsubscribe,
  };
};
