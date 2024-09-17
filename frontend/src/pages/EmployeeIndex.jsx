import { useEffect, useMemo, useRef, useState } from 'react'
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

    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef(null)
    const dropdownRef = useRef(null)

    useEffect(() => {   // open and shut list element
        function handleClick(event) {
            if (searchRef.current && searchRef.current.contains(event.target)) setIsOpen(true)
            else if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) setIsOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

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
            <SearchBar onFilter={onFilter} ref={searchRef} />
            {isOpen && <EmployeeList employees={employees} ref={dropdownRef} />}
        </section>
    )
}
