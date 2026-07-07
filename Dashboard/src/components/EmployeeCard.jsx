import { useState } from "react";

const EmployeeCard = ({ employee,onSelect,faviourite,favoriteIds2}) => {
   function toggleFavorite(id){
    console.log("now ok",id)
       if(favoriteIds2.includes(id)){
       faviourite(favoriteIds2.filter((fid)=>{
            return fid!==id
          }))
       }
       else{
   faviourite((prev)=>[...prev,id]);
       }
   }
  return (
    <div>
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>  
    <button onClick={() => onSelect(employee)}>
    View Details
</button>  <button onClick={()=>{toggleFavorite(employee.id)}}>🤍</button>
    </div>
  );
};

export default EmployeeCard;