import { Route, Routes } from 'react-router-dom'
import { Login } from './auth/'
import { HeroesRouter } from './heroes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/*" element={
          <PrivateRoute>
            <HeroesRouter />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default AppRouter
