import { HashRouter as Router, Routes, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { store } from './store/store'
import './style/main.css'

import { EmployeeIndex } from './pages/EmployeeIndex'

export function App() {
  return (
    // <EmployeeIndex/>
    // <Provider store={store}>
    <Router>
      {/* <AppHeader/> */}
      <main>
        <Routes>
          <Route path='/' element={<EmployeeIndex />} />
          {/* <Route path='/:employeeId' element={<EmployeeDetails />} /> */}
        </Routes>
      </main>
    </Router>
    // </Provider>
  )
}