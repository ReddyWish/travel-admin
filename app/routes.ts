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
    route('categories/add-category', 'pages/categories/add-category.tsx'),
    route(
      'categories/edit-category/:id',
      'pages/categories/[id]/edit-category.tsx',
    ),
    route('tours', 'pages/tours/tours.tsx'),
    route('tours/add-tour', 'pages/tours/add-tour.tsx'),
    route('tours/edit-tour/:id', 'pages/tours/[id]/edit-tour.tsx'),
    route('currencies', 'pages/currencies/currencies.tsx'),
  ]),
] satisfies RouteConfig;
