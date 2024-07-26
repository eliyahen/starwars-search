import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchPage from './pages/search/SearchPage'
import { StarWarsProvider } from './providers/starwars/StarWarsProvider'

function App() {
  return (
    <Layout>
      <StarWarsProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<SearchPage />} />
            <Route path="/:category" element={<div>Section</div>} />
          </Routes>
        </BrowserRouter>
      </StarWarsProvider>
    </Layout>
  )
}

export default App
