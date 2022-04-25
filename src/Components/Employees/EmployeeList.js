import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_API, DEFAULT_PROFILE_PATH, VACCINATED, VACCINATED_TYPE } from "../../constantsFile"

function EmployeeList() {

    const [users, setUsers] = useState([])

    useEffect(()=> {
        ReadUsers()
    }, [])

    const ReadUsers = () => {
        fetch(`${BASE_URL_API}employees`)
         .then(res => res.json())
         .then(
           (result) => {
             setUsers(result)
           }
         )
    }

    return(
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-10 py-1 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                Iniciar sesion como:
                            </th>
                        
                        </tr>
                    </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id}>
                        <Link to={`/employees/${user.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={DEFAULT_PROFILE_PATH} alt="" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                <span>{user.fname}</span> <span>{user.lname}</span>
                                    </div>
                                </div>
                                </div>
                            </td>
                            </Link>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
    )
}

export default EmployeeList