const LOG_WHITE_LIST = ["dev", "stg"];
const isDevENV = LOG_WHITE_LIST.some((env) =>
  window.location.host.startsWith(env)
);

const LoggerConfig = {
  LOG_LEVELS: {
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
  },

  DEFAULT_CONFIG: {
    level: "info",
    enableConsole: true,
    enableLocalStorage: true,
    maxStorageItems: 500,
    storageKey: "app_logs",
  },
};

class Logger {
  /*** @param {import('./loggerTypes').LoggerConfig} config*/
  constructor(config = {}) {
    this.config = {
      ...LoggerConfig.DEFAULT_CONFIG,
      enableLocalStorage: isDevENV,
      enableConsole: isDevENV,
      ...config,
    };
    this.koreaTimeFormatter = this.getKoreaTimeFormatter();
    this.logQueue = [];
    this.initialize();
  }

  // 초기화
  initialize() {
    if (this.config.enableLocalStorage) {
      this.loadLogsFromStorage();
    }
  }

  getKoreaTimeFormatter() {
    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  // 로그 생성
  createLogEntry(level, message, data = {}) {
    return {
      timestamp: this.koreaTimeFormatter.format(new Date()),
      level,
      message,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
  }

  // 로그 저장
  persistLog(logEntry) {
    if (this.config.enableConsole) {
      console[logEntry.level](logEntry.message, logEntry.data);
    }

    if (this.config.enableLocalStorage) {
      this.logQueue.push(logEntry);

      // 큐 크기가 최대값을 초과하면 가장 오래된 로그 제거
      while (this.logQueue.length > this.config.maxStorageItems) {
        this.logQueue.shift();
      }

      this.saveLogsToStorage();
    }
  }

  loadLogsFromStorage() {
    try {
      const storedLogs = localStorage.getItem(this.config.storageKey);
      this.logQueue = storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      console.error("Failed to load logs from storage:", error);
      this.logQueue = [];
    }
  }

  saveLogsToStorage() {
    try {
      localStorage.setItem(
        this.config.storageKey,
        JSON.stringify(this.logQueue)
      );
    } catch (error) {
      console.error("Failed to save logs to storage:", error);
    }
  }

  // 로깅 메서드
  log(level, message, data = {}) {
    const logEntry = this.createLogEntry(level, message, data);
    this.persistLog(logEntry);
    return logEntry;
  }

  debug(message, data = {}) {
    return this.log(LoggerConfig.LOG_LEVELS.DEBUG, message, data);
  }

  info(message, data = {}) {
    return this.log(LoggerConfig.LOG_LEVELS.INFO, message, data);
  }

  warn(message, data = {}) {
    return this.log(LoggerConfig.LOG_LEVELS.WARN, message, data);
  }

  error(message, data = {}) {
    return this.log(LoggerConfig.LOG_LEVELS.ERROR, message, data);
  }

  // 유틸리티 메서드
  clearLogs() {
    this.logQueue = [];
    if (this.config.enableLocalStorage) {
      localStorage.removeItem(this.config.storageKey);
    }
  }

  getLogs() {
    return [...this.logQueue];
  }

  getLogsByLevel(level) {
    return this.logQueue.filter((log) => log.level === level);
  }
}

const EVENT_NAMES = {
  af_complete_registration: "af_complete_registration",
  af_withdraw: "af_withdraw",
  af_page_view: "af_page_view",
  af_page_click: "af_page_click",
  af_coupon_use: "af_coupon_use",
  af_coupon_download: "af_coupon_download",
  af_coupon_register: "af_coupon_register",
  af_event_apply: "af_event_apply",
  af_mileage_exchange_use: "af_mileage_exchange_use",
};

/** @type {import('./appsFlyerEventTypes').EventPramsType} */
const EVENT_PARAMS = {
  af_complete_registration: (eventValues) => eventValues,
  af_withdraw: (eventValues) => eventValues,
  af_page_view: (eventValues) => eventValues,
  af_page_click: (eventValues) => eventValues,
  af_coupon_use: (eventValues) => eventValues,
  af_coupon_download: (eventValues) => eventValues,
  af_coupon_register: (eventValues) => eventValues,
  af_event_apply: (eventValues) => eventValues,
  af_mileage_exchange_use: (eventValues) => eventValues,
};

class AppsFlyerLogger extends Logger {
  /*** @param {import('./loggerTypes').LoggerConfig} config*/
  constructor(config = {}) {
    super({
      ...config,
      storageKey: "appsflyer_logs",
      maxStorageItems: 200,
    });
  }

  logEvent(eventName, eventValues = {}) {
    if (!eventName) return;

    try {
      // Android
      if (window?.AppsFlyerWebInterface) {
        window.AppsFlyerWebInterface?.logEvent(
          eventName,
          JSON.stringify(eventValues)
        );
        this.info("AppsFlyer Android Event", { eventName, eventValues });
        return;
      }

      // iOS
      if (window?.webkit?.messageHandlers) {
        const message = {
          command: "logEvent",
          name: eventName,
          parameters: eventValues,
        };
        window.webkit.messageHandlers?.appsFlyer?.postMessage(message);
        this.info("AppsFlyer iOS Event", { eventName, eventValues });
        return;
      }

      this.warn("AppsFlyer event logging failed", {
        eventName,
        eventValues,
      });
      console.log("No native AppsFlyer interface found", {
        eventName,
        eventValues,
      });
    } catch (error) {
      this.error("AppsFlyer event logging failed", {
        eventName,
        eventValues,
        error: error.message,
      });
    }
  }
}
