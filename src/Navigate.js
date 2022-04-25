import { Link } from "react-router-dom";
export default function Navigate(){
   return (
       <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
       <div className="flex items-center flex-shrink-0 text-white mr-6">
           <span className="font-semibold text-xl tracking-tight">REACT CRUD APP</span>
       </div>
       <div className="flex flex-wrap">

       <Link to="/">
           <button className="inline text-sm px-4 py-2 m-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0">
               HOME
           </button>
       </Link>
       <Link to="/employees">
           <button className="inline text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0">
               VISTA EMPLEADOS
           </button>
       </Link>
       </div>
       </nav>
   )
}