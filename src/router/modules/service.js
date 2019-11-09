/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const serviceRouter = {
  path: '/service',
  component: Layout,
  redirect: '/service/file',
  name: 'Service',
  meta: {
    title: '服务管理',
    icon: 'table'
  },
  children: [
    {
      path: 'auth',
      component: () => import('@/views/service/auth'),
      name: 'AuthService',
      meta: { title: '鉴权服务' }
    },
    {
      path: 'file',
      component: () => import('@/views/service/file'),
      name: 'FileService',
      meta: { title: '文件服务' }
    },
    {
      path: 'conn',
      component: () => import('@/views/service/conn'),
      name: 'ConnService',
      meta: { title: '长连接服务' }
    },
    {
      path: 'rtmp',
      component: () => import('@/views/service/file'),
      name: 'RtmpService',
      meta: { title: 'Rtmp服务' }
    },
    {
      path: 'supt',
      component: () => import('@/views/service/file'),
      name: 'SUPTService',
      meta: { title: 'SUPT服务' }
    }
  ]
}
export default serviceRouter
