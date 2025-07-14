import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"
import SearchPage from "./pages/SearchPage"
import NavigationTestPage from "./pages/NavigationTestPage"
import ErrorTestPage from "./pages/ErrorTestPage"

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/" data-testid="nav-home">
            Home
          </Link>
          <Link to="/user/123/profile" data-testid="nav-user">
            User Profile
          </Link>
          <Link to="/search?q=react&page=1&active=true&tags=frontend,typescript" data-testid="nav-search">
            Search
          </Link>
          <Link to="/navigation" data-testid="nav-navigation">
            Navigation Test
          </Link>
          <Link to="/error-test" data-testid="nav-error">
            Error Test
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id/:tab?" element={<UserPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/navigation" element={<NavigationTestPage />} />
          <Route path="/destination" element={<NavigationTestPage />} />
          <Route path="/error-test" element={<ErrorTestPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
