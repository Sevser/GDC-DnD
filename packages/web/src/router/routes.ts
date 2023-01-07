const routes = [
  {
    path: '/',
    redirect: { name: 'companies' },
  },
  {
    path: '*',
    redirect: { name: 'companies' },
  },
];

export default routes;
