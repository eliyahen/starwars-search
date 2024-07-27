import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StarWarsProvider } from './providers/starwars/StarWarsProvider'
import SearchPage from './pages/search/SearchPage'
import CategoryPage from './pages/categories/CategoryPage'

function App() {
  return (
    <BrowserRouter>
      <StarWarsProvider>
        <Layout>
          <Routes>
            <Route index element={<SearchPage />} />
            <Route path="/:category" element={<CategoryPage />} />
          </Routes>
        </Layout>
      </StarWarsProvider>
    </BrowserRouter>
  )
}

export default App
