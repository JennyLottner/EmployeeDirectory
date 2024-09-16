import { useEffect, useMemo, useState } from 'react'

import { employeeService } from '../services/employee.local.service'
import { utilService } from '../services/util.service'

import { SearchBar } from '../cmps/SearchBar'

export function EmployeeIndex() {
    const [employees, setEmployees] = useState([])
    const [filterTxt, setFilter] = useState('')

    useEffect(() => {
        async function loadEmployees() {
            try {
                const data = await employeeService.query(filterTxt)
                setEmployees(data)
            } catch (err) {
                console.log(err)
            }
        }
        loadEmployees()
    }, [filterTxt])

    function onFilter({ target }) {
        debouncedSetFilter(target.value)
    }
    const debouncedSetFilter = useMemo(() =>
        utilService.debounce((value) => {
            setFilter(value)
        }, 300), [])

    return (
        <section className='search-page flex column center'>
            <h1>Looking for an employee?</h1>
            <p>Click on the search bar to learn our suggestions</p>
            <SearchBar onFilter={onFilter} />
            {/* <ul>
                {employees && employees.map(employee => (
                    <li key={employee._id}>
                        <strong>{employee.name}</strong> - {employee.workTitle}
                    </li>
                ))}
            </ul> */}
        </section>
    )
}
