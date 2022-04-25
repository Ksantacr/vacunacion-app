import { Route, Routes } from "react-router-dom";
import Navigate from "./Navigate";
import CreateUser from "./Components/Users/CreateUser";
import UpdateUser from "./Components/Users/UpdateUser";
import UserList from "./Components/Users/UsersList";
import EmployeeList from "./Components/Employees/EmployeeList"
import UpdateEmployee from "./Components/Employees/UpdateEmployee"
export default function App(){
   return (
    <div>
    <Navigate></Navigate>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path='/create' element={<CreateUser />} />
      <Route path='/update/:id' element={<UpdateUser />}/>
      <Route path='/employees' element={<EmployeeList />}/>
      <Route path='/employees/:id' element={<UpdateEmployee />}/>
    </Routes>
  </div>
   )
}