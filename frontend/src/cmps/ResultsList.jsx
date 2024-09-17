import { EmployeePreview } from "./EmployeePreview";

export function ResultsList({ employees }) {

    return (
        <section className="list-section results-list-section">
            <ul className="employee-list flex column">
                {employees && employees.length > 0 && employees.map(employee => (
                    <EmployeePreview employee={employee} key={employee._id} />
                ))}
                {!employees.length && <li className="no-results">Try using more general terms to broaden your search.</li>}
            </ul>
        </section>
    )
}