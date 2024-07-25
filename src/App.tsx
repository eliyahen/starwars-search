import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchPage from './pages/search/SearchPage'

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path="/:section" element={<div>Section</div>} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
