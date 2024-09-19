import { NavLink } from 'react-router-dom'

export function EmployeePreview({ employee, filterTxt = '' }) {

    // Function to highlight text that matches the filter text
    function highlightText(text) {
        if (!filterTxt || filterTxt.length <= 1) return text

        const regex = new RegExp(`(${filterTxt})`, 'i') // Find instances of the filter text
        const parts = text.split(regex)  // Split text into array with filter text separated

        return parts.map((part, idx) =>  // Map through text parts, highlighting the ones that match
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