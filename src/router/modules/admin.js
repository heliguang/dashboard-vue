/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/user',
  name: 'Table',
  meta: {
    title: '后台管理',
    icon: 'table'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/admin/user'),
      name: 'ComplexTable',
      meta: { title: '用户管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/admin/role'),
      name: 'RolePermission',
      meta: { title: '角色管理' }
    }
  ]
}
export default adminRouter
