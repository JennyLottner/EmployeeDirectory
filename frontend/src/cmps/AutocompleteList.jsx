import { forwardRef } from "react";
import { EmployeePreview } from "./EmployeePreview";

export const AutocompleteList = forwardRef(({ employees, filterTxt }, ref) => {

    // Map through employees and render an EmployeePreview for each
    return (
        <section className="list-section autocomplete-list-section"  ref={ref}>
            <ul className="employee-list flex column">
                {employees && employees.length > 0 && employees.map(employee => (
                    <EmployeePreview employee={employee} filterTxt={filterTxt} key={employee._id}/>
                ))}
                {!employees.length && <li className="no-results">Try using more general terms to broaden your search.</li>}
            </ul>
        </section>
    )
})