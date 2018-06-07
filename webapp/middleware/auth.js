export default ({ store, route, redirect, error }) => {
  if (route.path === '/login') return;

  if (!store.state.auth.authUser) redirect('/login');
  else if (store.state.auth.authUser.role !== 'SU') error({ statusCode: 401, message: 'Not authorized' });
};
