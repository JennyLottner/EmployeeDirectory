import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function EmployeePreview({ employee }) {
    const { filterTxt } = useSelector(storeState => storeState.employeeModule)

    function highlightText(text) {
        if (!filterTxt || filterTxt.length <= 1) return text

        const regex = new RegExp(`(${filterTxt})`, 'i')
        const parts = text.split(regex)

        return parts.map(part =>
            part.toLowerCase() === filterTxt.toLowerCase()
                ? <mark>{part}</mark>
                : part
        )
    }

    return (
        <li key={employee._id}>
            <NavLink to={`/${employee._id}`} className="employee-preview grid" >
                <img src={employee.imgUrl} alt={employee.name} />
                <strong>{highlightText(employee.name)}</strong>
                <p>{highlightText(employee.workTitle)}</p>
            </NavLink>
        </li>
    )
}