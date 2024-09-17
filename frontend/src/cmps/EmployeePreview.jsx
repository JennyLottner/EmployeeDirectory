import { NavLink } from 'react-router-dom'

export function EmployeePreview({ employee, filterTxt = '' }) {

    function highlightText(text) {
        if (!filterTxt || filterTxt.length <= 1) return text

        const regex = new RegExp(`(${filterTxt})`, 'i')
        const parts = text.split(regex)

        return parts.map((part, idx) =>
            part.toLowerCase() === filterTxt.toLowerCase()
                ? <mark key={idx}>{part}</mark>
                : part
        )
    }

    return (
        <li key={employee._id}>
            <NavLink to={`/employee/${employee._id}`} className="employee-preview grid" >
                <img src={employee.imgUrl} alt={employee.name} />
                <strong>{highlightText(employee.name)}</strong>
                <p>{highlightText(employee.workTitle)}</p>
            </NavLink>
        </li>
    )
}