import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppRoute } from './common/app-route'
import { DashboardPage } from './pages/dashboard'
import LoginPage from './pages/login'
import { Toaster } from 'react-hot-toast'
import ErrorPage from './pages/error'
import { Navbar } from './layout/navbar'
import CategoriesPage from './pages/categories'
import ProductsPage from './pages/products'
import { FiltersProvider } from './common/contexts/filters-context'
import { ProductFiltersProvider } from './features/products/contexts/product-filters-context'
import CreateProductPage from './pages/create-product'
import ProductPage from './pages/product-detail'
import ProductSettingsPage from './pages/edit-product'
import { OrderFiltersProvider } from './features/orders/contexts/order-filters-context'
import OrdersPage from './pages/orders'
import OrderDetailPage from './pages/order-detail'
import { OfflineBanner } from './common/components/offline-banner'

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Toaster />
      <Navbar />
      <OfflineBanner />
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <AppRoutes />
      </div>
    </HashRouter>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path={AppRoute.Home} element={<DashboardPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Error} element={<ErrorPage />} />
      <Route
        path={`${AppRoute.Categories}/:slug?`}
        element={
          <FiltersProvider key={location.pathname}>
            <CategoriesPage />
          </FiltersProvider>
        }
      />
      <Route
        path={AppRoute.Products}
        element={
          <FiltersProvider key={location.pathname}>
            <ProductFiltersProvider>
              <ProductsPage />
            </ProductFiltersProvider>
          </FiltersProvider>
        }
      />
      <Route path={AppRoute.CreateProduct} element={<CreateProductPage />} />
      <Route path={AppRoute.ProductDetail} element={<ProductPage />} />
      <Route path={AppRoute.EditProduct} element={<ProductSettingsPage />} />
      <Route
        path={AppRoute.Orders}
        element={
          <FiltersProvider key={location.pathname}>
            <OrderFiltersProvider>
              <OrdersPage />
            </OrderFiltersProvider>
          </FiltersProvider>
        }
      />
      <Route path={AppRoute.Order} element={<OrderDetailPage />} />
    </Routes>
  )
}

export default App
