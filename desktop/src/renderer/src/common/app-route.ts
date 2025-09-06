export enum AppRoute {
  Home = '/',
  Login = '/auth/login',
  Categories = '/categories',
  Products = '/products',
  NotFound = '*',
  ProductDetail = '/products/:slug',
  CreateProduct = '/products/create',
  EditProduct = '/products/edit/:slug',
  Orders = '/orders',
  Order = '/orders/:id',
  Error = '/error'
}
