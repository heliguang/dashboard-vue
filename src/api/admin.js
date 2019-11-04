import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: '/admin/addUser',
    method: 'post',
    data
  })
}

export function deleteUser(user) {
  return request({
    url: '/admin/deleteUser',
    method: 'post',
    user
  })
}

export function updateUser(user) {
  return request({
    url: '/admin/updateUser',
    method: 'post',
    user
  })
}

export function getAllUser() {
  return request({
    url: '/admin/getAllUser',
    method: 'get'
  })
}
