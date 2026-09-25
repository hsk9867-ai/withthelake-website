/**
 * STORE 제품 목록 — 네이버 스마트스토어(withlab201) 연동.
 * 기존 withthelake.com/store 의 제품 데이터를 옮겨 왔습니다. 가격은 스마트스토어 기준이며 변동 시 이 파일만 수정합니다.
 */

export type ProductCategory = "케어" | "어싱" | "체험";

export type Product = {
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  badge?: string;
  image: string;
  url: string;
  /** WITH WELL ME 5축 매핑 */
  axis: "EAT" | "MOVE" | "WALK" | "CARE" | "RECOVER";
};

export const STORE_URL = "https://smartstore.naver.com/withlab201";

export const PRODUCTS: Product[] = [
  {
    brand: "위드웰미",
    name: "데일리 파워 쿨링 미스트 100ml",
    price: 37800,
    originalPrice: 42000,
    category: "케어",
    badge: "베스트",
    image: "/assets/store/withwellme_powercoolingmist.jpg",
    url: "https://smartstore.naver.com/withlab201/products/12254246304",
    axis: "CARE",
  },
  {
    brand: "위드웰미",
    name: "데일리 풋샴푸 풋워시 200ml",
    price: 17820,
    originalPrice: 19800,
    category: "케어",
    badge: "인기",
    image: "/assets/store/withwellme_dailyfootwash.jpg",
    url: "https://smartstore.naver.com/withlab201/products/12248115925",
    axis: "CARE",
  },
  {
    brand: "숨토프랜드",
    name: "어싱 패드 접지 매트 (슈퍼싱글 · 퀸)",
    price: 270000,
    category: "어싱",
    image: "/assets/store/soomtofriend_earthingpad.jpg",
    url: "https://smartstore.naver.com/withlab201/products/12362102946",
    axis: "RECOVER",
  },
  {
    brand: "숨토프랜드",
    name: "접지 어싱 베개 커버 60×70cm",
    price: 60000,
    category: "어싱",
    badge: "추천",
    image: "/assets/store/soomtofriend_earthingcover.jpg",
    url: "https://smartstore.naver.com/withlab201/products/12314861939",
    axis: "RECOVER",
  },
  {
    brand: "힐링로드ON",
    name: "태백 웰니스 걷기 투어 (당일형)",
    price: 10000,
    category: "체험",
    image: "/assets/store/withwellme_logo1.jpeg",
    url: "https://smartstore.naver.com/withlab201/products/12679438666",
    axis: "WALK",
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = ["케어", "어싱", "체험"];

export function formatPrice(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}
