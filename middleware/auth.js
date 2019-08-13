export default function (context) {
  const isServer = process.server
  if (isServer) {
    const jwt = require('../server/helpers/jwt')
    if (!context.req.headers.cookie) {
      context.redirect('/login')
      return
    }
    const tokenCookie = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')) || ''
    const token = tokenCookie.split('=')[1]
    const isVerified = jwt.verify(token, true)
    if (!isVerified) {
      context.redirect('/login')
    } else {
      context.store.commit('dashboard/updateAuthenticated', true)
      context.store.commit('dashboard/updateToken', token)
    }
  } else {
    const isAuthenticated = context.store.state.dashboard.isAuthenticated
    if (!isAuthenticated) {
      context.redirect('/login')
    }
  }
}
