import { HashRouter, Route, Routes } from 'react-router-dom'
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

function App(): React.JSX.Element {
  return (
    <>
      <HashRouter>
        <Toaster />
        <Navbar />
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
          <Routes>
            <Route path={AppRoute.Home} element={<DashboardPage />} />{' '}
            <Route path={AppRoute.Login} element={<LoginPage />} />{' '}
            <Route path={AppRoute.Error} element={<ErrorPage />} />{' '}
            <Route
              path={`${AppRoute.Categories}/:slug?`}
              element={
                <FiltersProvider>
                  <CategoriesPage />
                </FiltersProvider>
              }
            />
            <Route
              path={AppRoute.Products}
              element={
                <FiltersProvider>
                  <ProductFiltersProvider>
                    <ProductsPage />
                  </ProductFiltersProvider>
                </FiltersProvider>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </>
  )
}

export default App
