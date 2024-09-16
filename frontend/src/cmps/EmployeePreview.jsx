export function EmployeePreview({ employee }) {

    return (
        <li key={employee._id}>
            <strong>{employee.name}</strong> - {employee.workTitle}
        </li>
    )
}