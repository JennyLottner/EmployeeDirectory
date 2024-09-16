import { HashRouter as Router, Routes, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { store } from './store/store'
import './style/main.css'

import { EmployeeIndex } from './pages/EmployeeIndex'
import { AppHeader } from './cmps/AppHeader'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <AppHeader/>

        <Routes>
          <Route path='/' element={<EmployeeIndex />} />
          {/* <Route path='/:employeeId' element={<EmployeeDetails />} /> */}
        </Routes>
    </Router>
    // </Provider>
  )
}