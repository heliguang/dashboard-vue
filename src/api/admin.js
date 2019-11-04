import request from '@/utils/request'

export function replaceUser(data) {
  return request({
    url: '/admin/replaceUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/admin/deleteUser',
    method: 'post',
    data
  })
}

export function getAllUser() {
  return request({
    url: '/admin/getAllUser',
    method: 'get'
  })
}
