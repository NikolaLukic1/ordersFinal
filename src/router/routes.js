
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Uputstvo.vue') },
      { path: '/kupac', component: () => import('pages/Kupac.vue') },
      { path: '/importOrder', component: () => import('pages/Import order.vue') },
      { path: '/viewOrder', component: () => import('pages/Orders review.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
