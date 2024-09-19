import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

import { loadEmployeeById, setEmployeeFilter } from '../store/actions/employee.actions'

export function EmployeeDetails() {
    const { employeeId } = useParams()  // Retrieve employeeId from URL parameters
    const [employee, setEmployee] = useState() // State to hold the employee details

    // Reset the employee filter when employeeId changes
    useEffect(() => {
        setEmployeeFilter('')
    }, [employeeId])

    // Load employee details based on employeeId
    useEffect(() => {
        async function loadEmployee(employeeId) {
            try {
                const employee = await loadEmployeeById(employeeId)
                setEmployee(employee)
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        loadEmployee(employeeId)
    }, [employeeId])

    return (
        <section className="details-page flex column center">
            <NavLink to='/' className='back-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M3515 5100 c-44 -18 -189 -159 -1228 -1197 -952 -951 -1184 -1188 -1203 -1228 -18 -37 -24 -67 -24 -115 0 -132 -74 -50 1223 -1346 1123 -1123 1174 -1173 1230 -1193 73 -27 131 -27 204 1 48 17 77 40 174 137 144 143 163 177 164 286 0 58 -5 91 -19 120 -13 27 -333 355 -995 1018 l-976 977 977 978 c537 537 984 993 994 1012 9 19 19 67 22 106 7 110 -20 160 -166 305 -98 97 -127 119 -175 137 -71 27 -136 27 -202 2z" /></g></svg>
            </NavLink>
            {employee && <div className='employee-info flex column align-center'>
                <h1>{employee.name}</h1>
                <img src={employee.imgUrl} alt={employee.name} />
                <h2>{employee.workTitle}</h2>
            </div>}
        </section>
    )
}