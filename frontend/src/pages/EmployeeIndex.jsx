import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { utilService } from '../services/util.service'
import { loadEmployees, setEmployeeFilter } from '../store/actions/employee.actions'

import { SearchBar } from '../cmps/SearchBar'
import { EmployeeList } from '../cmps/EmployeeList'

export function EmployeeIndex() {
    const { employees } = useSelector(storeState => storeState.employeeModule)
    const { filterTxt } = useSelector(storeState => storeState.employeeModule)
    const { pathname } = useLocation()

    useEffect(() => {  //load employees based on filter
        loadEmployees()
    }, [filterTxt])

    useEffect(() => {  // filter reset on navigation
        setEmployeeFilter('')
    }, [pathname])

    function onFilter({ target }) {
        debouncedSetFilter(target.value)
    }
    const debouncedSetFilter = useMemo(() =>
        utilService.debounce((value) => {
            setEmployeeFilter(value)
        }, 300), [])

    return (
        <section className='search-page flex column center'>
            <h1>Looking for an employee?</h1>
            <p>Click on the search bar to learn our suggestions</p>
            <SearchBar onFilter={onFilter} />
            <EmployeeList employees={employees} />
        </section>
    )
}
