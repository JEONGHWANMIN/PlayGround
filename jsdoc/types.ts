export interface EventPramsType {
  af_complete_registration: (eventValues: CompleteRegistration) => CompleteRegistration,
  af_withdraw: (eventValues: Withdraw) => Withdraw,
  af_page_view: (eventValues: PageView) => PageView,
  af_page_click: (eventValues: PageClick) => PageClick,
  af_coupon_use: (eventValues: CouponUse) => CouponUse,
  af_coupon_download: (eventValues: CouponUse) => CouponUse,
  af_coupon_register: (eventValues: CouponRegister) => CouponRegister,
  af_event_apply: (eventValues: EventApply) => EventApply,
  af_mileage_exchange_use: (eventValues: MileageExchangeUse) => MileageExchangeUse,
}

export interface CompleteRegistration {
  af_registration_method: string,
  af_customer_user_id: string,
  af_param_1: string
}

export interface Withdraw {
  af_customer_user_id: string,
  af_date_withdraw: `${string}-${string}-${string} ${string}:${string}`
}

export interface PageView {
  af_customer_user_id?: string
  af_customer_user_register_date?: string
  af_date_a: string
  af_page_name: string
  af_page_url: string
}

export interface PageClick {
  af_customer_user_id?: string
  af_destination_b?: string
  af_date_a: string
  af_destination_a: string
  af_click_event_name: string
}

export interface CouponUse {
  af_customer_user_id: string
  af_coupon_id: string
  af_coupon_name: string
  af_date_a: string
  af_divide_code: string
  af_coupon_type: string
}

export interface CouponDownload {
  af_customer_user_id: string
  af_coupon_id: string
  af_coupon_name: string
  af_date_a: string
  af_divide_code: string
  af_coupon_type: string
  af_customer_user_register_date: string
}

export interface CouponRegister {
  af_customer_user_id: string
  af_coupon_id: string
  af_coupon_name: string
  af_date_a: string
  af_divide_code: string
  af_coupon_type: string
}

export interface EventApply {
  af_customer_user_id: string
  af_event_id: string
  af_event_name: string
  af_date_a: string
}

export interface MileageExchangeUse {
  af_customer_user_id: string
  af_coupon_id: string
  af_coupon_name: string
  af_date_a: string
  af_divide_code: string
  af_coupon_type: string
  af_used_mileage: string
}