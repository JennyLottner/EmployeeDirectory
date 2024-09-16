export function EmployeePreview({ employee }) {

    return (
        <li key={employee._id} className="employee-preview grid">
            <img src={employee.imgUrl} alt={employee.name} />
            <strong>{employee.name}</strong>
            <p>{employee.workTitle}</p>
        </li>
    )
}