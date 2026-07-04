import EmployeeCard from "./components/EmployeeCard";
import { fetchEmployees } from "./services.js/api";
import { useState,useEffect} from "react";
import EmployeeDetails from "./components/EmployeeDetails";
function App() {
   const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [sortBy, setSortBy] = useState("all");
const [sortOrder, setSortOrder] = useState("asc");
const [currentPage, setCurrentPage] = useState(1);
const [selectedEmployee, setSelectedEmployee] = useState(null);
console.log("selected",selectedEmployee);
  useEffect(() => {
  async function getEmployees() {
    try {
      const users = await fetchEmployees();
      setEmployees(users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  getEmployees();
}, []);
 if (loading) {
    return <h2>Loading employees...</h2>;
  }
  if (error) {
    return <h2>Error: {error}</h2>;
  }
  if (employees.length === 0) {
    return <h2>No employees found.</h2>;
  }
 
const filteredEmployees = employees.filter((employee) =>
  employee.firstName
    .toLowerCase()
    .includes(search.toLowerCase())
).filter(employee =>
    selectedGender === "all"
        ? true
        : employee.gender === selectedGender
);

const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if(sortBy==="all"){
      return 0
    }
    const fieldA = sortBy === "name" ? a.firstName : a.gender;
    const fieldB = sortBy === "name" ? b.firstName : b.gender;
    const comparison = fieldA.localeCompare(fieldB);

    return sortOrder === "asc" ? comparison : -comparison;
  });
const totalEmployees = sortedEmployees.length;
const employeesPerPage=10;
const totalPages =
Math.ceil(totalEmployees / employeesPerPage);
const startIndex =
(currentPage-1)*employeesPerPage;
const endIndex =
startIndex+employeesPerPage;
 function increasePage(){
    if(currentPage==totalPages){
      alert("no next page")
      return
    }
   setCurrentPage((prev)=>prev+1);
  }
 function decreasePage(){
  if(currentPage==1){
    alert("no previus Page")
    return 
  }
   setCurrentPage((prev)=>prev-1);
  }
  return (
    <div>
      <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>
<select
    id="gender"
    value={selectedGender}
    onChange={(e)=>setSelectedGender(e.target.value)}
>
    <option value="all">All</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
</select>
<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
         <option value="all">Sort by Nothing</option> 
        <option value="name">Sort by Name</option>
        <option value="gender">Sort by Gender</option>
      </select>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending (A-Z)</option>
        <option value="desc">Descending (Z-A)</option>
      </select>
      <h1>Employee Dashboard</h1>
        {sortedEmployees.slice(startIndex,endIndex).map((employee) => (
        <EmployeeCard key={employee.id} employee={employee}  onSelect={setSelectedEmployee} />
      ))}
       <EmployeeDetails employee={selectedEmployee}></EmployeeDetails>

       <button onClick={decreasePage}>Prev Page</button>
      <button onClick={increasePage}> Next Page</button>
    </div>
  );
}

export default App;