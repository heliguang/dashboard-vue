import request from '@/utils/request'

export function replaceUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}

export function getAllUser() {
  return request({
    url: '/users',
    method: 'get'
  })
}
