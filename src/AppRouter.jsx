import { Route, Routes } from 'react-router-dom'
import { Login } from './auth/pages'
import { HeroesRouter } from './heroes'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<HeroesRouter />} />
      </Routes>
    </>
  )
}

export default AppRouter
