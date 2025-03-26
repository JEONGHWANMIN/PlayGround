import { generateQueryHash } from "./utils";

/**
 * @implements {import('./types/Query').Query}
 * @template TData
 * @template TError
 * @template {import('./types/utils').QueryKey} TQueryKey
 */
export class Query {
  /**
   * @param {import('./types/utils').QueryOptions<TData, TError, TQueryKey>} options
   */
  constructor(options) {
    /** @type {TQueryKey} */
    this.queryKey = options.queryKey;
    /** @type {() => Promise<TData>} */
    this.queryFn = options.queryFn;
    /** @type {string} */
    this.queryHash = generateQueryHash(options.queryKey);
    /** @type {TData|undefined} */
    this.data = undefined;
    /** @type {TError|null} */
    this.error = null;
    /** @type {'idle'|'loading'|'success'|'error'} */
    this.status = "idle"; // idle, loading, success, error
    /** @type {Date} */
    this.lastUpdated = new Date();
    /** @type {import('./QueryObserver').QueryObserver[]} */
    this.subscribers = [];
    /** @type {number} */
    this.staleTime = options.staleTime || 0; // Time in ms before query is considered stale
    /** @type {number} */
    this.gcTime = options.gcTime || 5 * 60 * 1000; // Default 5 minutes for garbage collection
    /** @type {Promise<TData>|null} */
    this.promise = null; // 현재 실행 중인 프라미스를 추적
  }

  /**
   * @returns {void}
   */
  notify() {
    this.subscribers.forEach((subscriber) => subscriber.onQueryUpdate(this));
  }

  /**
   * @param {import('./QueryObserver').QueryObserver} observer
   * @returns {void}
   */
  addSubscriber(observer) {
    if (!this.subscribers.includes(observer)) {
      this.subscribers.push(observer);
    }
  }

  /**
   * @param {import('./QueryObserver').QueryObserver} observer
   * @returns {void}
   */
  removeSubscriber(observer) {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
  }

  /**
   * @param {TData} newData
   * @returns {void}
   */
  setData(newData) {
    this.data = newData;
    this.status = "success";
    this.error = null;
    this.lastUpdated = new Date();
    this.promise = null; // 프라미스 초기화
    this.notify();
  }

  /**
   * @param {TError} error
   * @returns {void}
   */
  setError(error) {
    this.error = error;
    this.status = "error";
    this.lastUpdated = new Date();
    this.promise = null; // 프라미스 초기화
    this.notify();
  }

  /**
   * @returns {Promise<TData>}
   */
  async execute() {
    // 이미 진행 중인 요청이 있으면 그 결과를 재사용
    if (this.promise) {
      return this.promise;
    }

    try {
      this.status = "loading";
      this.notify();

      // 새 프라미스 생성 및 저장
      this.promise = this.queryFn();

      const result = await this.promise;
      this.setData(result);

      return result;
    } catch (error) {
      this.setError(error);
      throw error;
    }
  }

  /**
   * @returns {boolean}
   */
  isStale() {
    const now = new Date().getTime();
    return now - this.lastUpdated.getTime() > this.staleTime;
  }

  /**
   * @returns {boolean}
   */
  isLoading() {
    return this.status === "loading";
  }
}
