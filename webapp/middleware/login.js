export default ({ store, redirect }) => {
  if (store.state.auth.authUser) redirect('/');
};
