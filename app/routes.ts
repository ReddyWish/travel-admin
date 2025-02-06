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
        route('bookings', 'pages/bookings/bookings.tsx'),
        route('customers', 'pages/customers/customers.tsx'),
        route('reviews', 'pages/reviews/reviews.tsx'),
        route('tours', 'pages/tours/tours.tsx'),
    ]),
] satisfies RouteConfig;