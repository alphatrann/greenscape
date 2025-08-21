import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppRoute } from './common/app-route'
import { DashboardPage } from './pages/dashboard'
import LoginPage from './pages/login'
import { Toaster } from 'react-hot-toast'
import ErrorPage from './pages/error'
import { Navbar } from './layout/navbar'

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
          </Routes>
        </div>
      </HashRouter>
    </>
  )
}

export default App
