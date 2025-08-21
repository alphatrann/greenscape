export enum AppRoute {
  Home = '/',
  Login = '/auth/login',
  Products = '/products',
  NotFound = '*',
  CreateProduct = '/products/create',
  EditProduct = '/products/edit/:id',
  Orders = '/orders',
  Order = '/orders/:id',
  Error = '/error'
}
