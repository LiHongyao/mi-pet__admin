import request from './request';


/**
 * 登录
 * @param data 
 */
export function login(data: {
  username: string,
  password: string
}) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * 获取申请商户列表
 * @param data 
 */
export function applyList(data:{
  page: number,
  pageSize: number
}) {
  return request({
    url: '/user/applyList',
    method: 'POST',
    data
  })
}

/**
 * 商户申请审核
 * @param data 
 */
export function examine(data:{
  userId: number,
  result: number
}) {
  return request({
    url: '/user/examine',
    method: 'POST',
    data
  })
}


