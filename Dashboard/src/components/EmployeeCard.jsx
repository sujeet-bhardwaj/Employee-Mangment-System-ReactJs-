import { useState } from "react";

const EmployeeCard = ({ employee,onSelect}) => {

  return (
    <div>
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>
    <button onClick={() => onSelect(employee)}>
    View Details
</button>
    </div>
  );
};

export default EmployeeCard;