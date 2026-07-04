import React from 'react'

const EmployeeDetails = ({employee}) => {
    console.log(employee)
   if(!employee){
    return <h1>No one is here</h1>
   }

  return (
    <div>EmployeeDetails</div>
  )
}

export default EmployeeDetails