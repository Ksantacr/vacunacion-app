import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_API, DEFAULT_PROFILE_PATH, VACCINATED, VACCINATED_TYPE } from "../../constantsFile"

import formatDate from "../../utils/utils"

function UserList() {

    const [users, setUsers] = useState([])
    const [vaccinated, setVaccinated] = useState(VACCINATED.ALL)
    const [vaccineType, setVaccineType] = useState(VACCINATED_TYPE.ALL)
    const [vaccineDate, setVaccineDate] = useState(formatDate(new Date()))
    const [searchByDate, setSearchByDate] = useState(false)

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

    const DeleteUser = id => {
        
        fetch(`${BASE_URL_API}employees/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
            if(res.status === 200) {
                ReadUsers()
            } else {
                alert("Ha ocurrido un problema al eliminar al usuario")
            }
        })
      }

    const UpdateUser = id => {
        window.location = '/update/'+id
    }


    const listWithFilter = useMemo(()=> {
        let result = vaccinated === VACCINATED.ALL ? [...users] : vaccinated === VACCINATED.YES ? [...users].filter(item => item.isVaccinated) : [...users].filter(item => !item.isVaccinated)

        if(result.length > 0) {
            result = vaccineType === VACCINATED_TYPE.ALL ? [...result] : [...result].filter(item => item.vaccineType == vaccineType)
        }

        if(searchByDate) {
            result = [...result].filter(item => item.vaccinationdDate == vaccineDate)
        }

        return result
    }, [vaccinated, vaccineType, vaccineDate, searchByDate, users])

    return(
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between px-20 py-2">
                    <div className="flex-1 min-w-0">
                        <select onChange={e => setVaccinated(e.target.value)} value={vaccinated} className="form-select form-select-sm md:w-1/5 px-2 py-1  mr-2 text-sm border border-solid rounded">
                            <option key={VACCINATED.ALL} value={VACCINATED.ALL}>Estado de vacunacion - TODOS</option>
                            <option key={VACCINATED.YES} value={VACCINATED.YES}>Si</option>
                            <option key={VACCINATED.NO} value={VACCINATED.NO}>No</option>
                        </select>
                        <select onChange={e => setVaccineType(e.target.value)} value={vaccineType} className="form-select form-select-sm md:w-1/4 px-3 py-1 mr-2 text-sm border border-solid rounded">
                            <option key={VACCINATED_TYPE.ALL} value={VACCINATED_TYPE.ALL}>Tipo de vacuna - TODOS</option>
                            <option key={VACCINATED_TYPE.Sputnik} value={VACCINATED_TYPE.Sputnik}>Sputnik</option>
                            <option key={VACCINATED_TYPE.AstraZeneca} value={VACCINATED_TYPE.AstraZeneca}>AstraZeneca</option>
                            <option key={VACCINATED_TYPE.Pfizer} value={VACCINATED_TYPE.Pfizer}>Pfizer</option>
                            <option key={VACCINATED_TYPE.JhonsonJhonson} value={VACCINATED_TYPE.JhonsonJhonson}>Jhonson&Jhonson</option>
                        </select>
                        <label>Buscar por fecha:
                            <input type="checkbox" checked={searchByDate} onChange={e => setSearchByDate(e.target.checked)}/>
                        </label>
                        
                        {searchByDate && (
                        <label className="block form-select form-select-sm md:w-1/2 px-3 py-1 mt-3 text-sm border border-solid rounded">
                            Fecha de vacunacion: 
                            <input onChange={e=> setVaccineDate(e.target.value)} value={vaccineDate} className="ml-5" type="date"></input>
                        </label>)}
                    </div>
                    
                    <div className="mt-5 flex lg:mt-0 lg:ml-4 block">
                        <span className="hidden sm:block">
                        <Link to="/create">
                            <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                CREATE
                            </button>
                        </Link>
                        </span>
                    </div>
                </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-10 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cedula
                    </th>
                    <th scope="col" className="px-10 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
                    <th scope="col" className="px-10 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacunado</th>
                    <th scope="col" className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosis</th>
                    <th scope="col" className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                    <th scope="col" className="relative px-6 py-1">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {listWithFilter.map((user) => (
                    <tr key={user.id}>
                        <td className="px-10 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                                {user.id}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={DEFAULT_PROFILE_PATH} alt="" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                               <span> {user.fname}</span> <span>{user.lname}</span>
                                </div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                                {user.isVaccinated ? 'Si' : 'No'}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                                {user.dose}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                                {user.email}
                            </div>
                        </td>
                        <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => UpdateUser(user.id)} className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-800 border-blue-600 hover:bg-blue-300 hover:text-blue-500 mt-4 lg:mt-0">EDITAR</button>
                            <button onClick={() => DeleteUser(user.id)} className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-800 border-red-600 hover:bg-red-300 hover:text-red-500 mt-4 lg:mt-0">ELIMINAR</button>
                        </td>
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

export default UserList