import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './style/main.css'

import { AppHeader } from './cmps/AppHeader'
import { EmployeeIndex } from './pages/EmployeeIndex'
import { EmployeeDetails } from './pages/EmployeeDetails'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />

        <Routes>
          <Route path='/' element={<EmployeeIndex />} />
          <Route path='/employee/:employeeId' element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </Provider>
  )
}