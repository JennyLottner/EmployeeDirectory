import { NavLink } from 'react-router-dom'

export function EmployeePreview({ employee }) {

    return (
        <NavLink to={`/${employee._id}`}>
            <li className="employee-preview grid" key={employee._id}>
                <img src={employee.imgUrl} alt={employee.name} />
                <strong>{employee.name}</strong>
                <p>{employee.workTitle}</p>
            </li>
        </NavLink>
    )
}