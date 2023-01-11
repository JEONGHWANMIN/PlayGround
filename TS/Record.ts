/**
 * Record<Keys, Type>
 * 프로퍼티를 다른 타입에 매핑시키는데 사용되는 유틸타입
 * keys값에 Type을 매핑한다.
 */

type Record1<K extends keyof any, T> = {
  [P in K]: T;
};

interface PageInfo {
  title: string;
}

type Page = "Home" | "About";

const nav: Record1<Page, PageInfo> = {
  Home: { title: "asds" },
  About: { title: "about" },
};
