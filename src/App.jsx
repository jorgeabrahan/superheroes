import AppRouter from './AppRouter'
import { AuthProvider } from './auth'

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
