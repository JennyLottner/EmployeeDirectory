import { EmployeePreview } from "./EmployeePreview";

export function EmployeeList({ employees }) {

    return (
        <ul className="employee-list flex column">
            {employees && employees.length > 0 && employees.map(employee => (
                <EmployeePreview employee={employee} />
            ))}
            {!employees.length && <li>Try using more general terms to broaden your search.</li>}
        </ul>
    )
}