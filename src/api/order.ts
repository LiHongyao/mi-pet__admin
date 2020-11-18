import request from './request'

/**
 * 获取申请售后订单列表
 * @param data 
 */
export function refundList(data: {
  pageSize: number,
  page: number,
  status: number // 0 未处理  1 已处理
}) {
  return request({
    url: '/order/refundList',
    method: 'POST',
    data
  })
}


/**
 * 售后订单审核
 * @param data 
 */
export function examine(data: {
  orderId: number,
  result: number // 1 退货再退款；2 直接退款； 3 拒绝
  failReason?: string,
  merchantName?: string,
  merchantPhone?: string,
  merchantAddress?: string
}) {
  return request({
    url: '/order/examine',
    method: 'POST',
    data
  })
} 

/**
 * 
 * @param orderId 确认用户退货物流已收到货进行退款
 */
export function confirmRefundExp(orderId: number) {
  return request({
    url: '/order/confirmRefundExp',
    method: 'POST',
    data: { orderId }
  })
} 

