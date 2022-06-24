import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login/index'));
const Layout = lazy(() => import('@/pages/layout/index'));
const Page1 = lazy(() => import('@/pages/page1/index'));
const Page2 = lazy(() => import('@/pages/page2/index'));

const routes = (auth: { role?: number }) => [
  {
    path: '/',
    element: auth.role ? <Layout /> : <Navigate to='/login' />,
    children: [
      { path: '/', element: <Navigate to='/page2' /> },
      { path: '/page1', element: <Page1 /> },
      { path: '/page2', element: <Page2 /> },
      // {
      //   path: 'member',
      //   element: <Outlet />,
      //   children: [
      //     { path: '/', element: <MemberGrid /> },
      //     { path: '/add', element: <AddMember /> },
      //   ],
      // },
    ],
  },
  {
    path: '/login',
    element: auth.role ? <Navigate to='/' /> : <Login />,
  },
];

export default routes;
