import request from './request';

/**
 * 根据条件获取商品列表
 * @param data 
 */
export function list(data:{
  status: number, // 0最近上传;1商品列表
  keyword?: string,
  page: number,
  pageSize: number
}) {
  return request({
    url: '/goods/list',
    method: 'POST',
    data
  })
}

/**
 * 获取商品详细信息
 * @param goodsId 
 */
export function details(goodsId: number) {
  return request({
    url: `/goods/${goodsId}`
  })
}

/**
 * 获取商品评价列表
 * @param data 
 */
export function goodscomments(data: {
  goodsId: number,
  page: number,
  pageSize: number
}) {
  return request({
    url: '/goodscomments/list',
    method: 'POST',
    data
  })
}

/**
 * 上下架商品
 * @param data 
 */
export function status(data: {
  goodsId: number, // 1 上架；2 下架；3 拒绝上架
  status: number
}) {
  return request({
    url: '/goods/status',
    method: 'POST',
    data
  })
}











