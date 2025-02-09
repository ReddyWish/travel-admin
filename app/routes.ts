import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('pages/home/home.tsx'),

  //Protected routes
  layout('shared/layouts/admin.tsx', [
    route('categories', 'pages/categories/categories.tsx'),
    route('tours', 'pages/tours/tours.tsx'),
    route('currencies', 'pages/currencies/currencies.tsx'),
  ]),
] satisfies RouteConfig;
