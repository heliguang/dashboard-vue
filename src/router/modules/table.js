/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
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
    }
  ]
}
export default tableRouter
