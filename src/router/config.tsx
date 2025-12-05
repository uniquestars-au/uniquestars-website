
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/page'));
const About = lazy(() => import('../pages/about/page'));
const Services = lazy(() => import('../pages/services/page'));
const TherapyApproach = lazy(() => import('../pages/therapy-approach/page'));
const Testimonials = lazy(() => import('../pages/testimonials/page'));
const FAQ = lazy(() => import('../pages/faq/page'));
const Contact = lazy(() => import('../pages/contact/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/therapy-approach',
    element: <TherapyApproach />,
  },
  {
    path: '/testimonials',
    element: <Testimonials />,
  },
  {
    path: '/faq',
    element: <FAQ />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
