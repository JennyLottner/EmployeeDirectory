import { forwardRef } from "react";
import { EmployeePreview } from "./EmployeePreview";

export const EmployeeList = forwardRef(({ employees }, ref) => {

    return (
        <section className="employee-list-section"  ref={ref}>
            <ul className="employee-list flex column">
                {employees && employees.length > 0 && employees.map(employee => (
                    <EmployeePreview employee={employee} key={employee._id}/>
                ))}
                {!employees.length && <li className="no-results">Try using more general terms to broaden your search.</li>}
            </ul>
        </section>
    )
})