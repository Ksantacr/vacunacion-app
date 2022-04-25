import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { BASE_URL_API, VACCINATED_TYPE } from "../../constantsFile"
import { useForm } from "react-hook-form";

 
function UpdateEmployee() {
    const { id } = useParams();
    const [ resultApi, setResultApi ] = useState({})
    const [isVaccinated, setIsVaccinated] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    
    const onSubmit = (data) => {

        const obj = {...resultApi, ...data}
        fetch(`${BASE_URL_API}employees/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
        .then(res => {
            if(res.status == 200) {
                alert('Actualizado con exito')
            } else {
                alert('Problema al actualizar al empleado, intente de nuevo')
            }
        })
   }

   useEffect(() => {
    fetch(`${BASE_URL_API}employees/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
            
            setValue("identificationCard", result.identificationCard)
            setValue("address", result.address)
            setValue("phone", result.phone)
            setValue("isVaccinated", result.isVaccinated)
            setValue("vaccineType", result.vaccineType)
            setValue("vaccinationdDate", result.vaccinationdDate)
            setValue("birthday", result.birthday)
            setValue("dose", result.dose)
            setResultApi(result)
            setIsVaccinated(result.isVaccinated)
        }
      )
  }, [id])

  useEffect(()=> {
      setValue("isVaccinated", isVaccinated)
  }, [isVaccinated])

    return (
       <form class="w-full max-w-lg mx-auto my-20" onSubmit={handleSubmit(onSubmit)}>
       <div className="flex flex-wrap mx-3 mb-2">
            <input type="hidden" {...register("identificationCard", { required: true, maxLength: 10, minLength: 10, pattern: /^(0|[1-9][0-9]*)$/ })} />

            <div className="w-full px-3 mb-3 md:mb-0">
            <h2 className="block uppercase tracking-wide font-bold mb-5 text-gray-700" for="grid-first-name">
                Cedula: {resultApi.identificationCard}
            </h2>
           </div>
           <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                    Fecha de nacimiento
                </label>
                <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                type="date"
                {...register("birthday", { required: true })}
                />
                {errors.birthday && errors.birthday.type === "required" && <span className="text-red-700 mb-3">Campo requerido</span>}
           </div>

           <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                   Telefono
               </label>
               <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
               type="tel"
               label="Phone"
               {...register("phone", { required: true, pattern: /^[0-9]+$/ })}
               />
               {errors.phone && <span className="text-red-700">Campo requerido</span>}
               {errors.phone && errors.phone.type === "phone" && <span className="text-red-700">Solo numeros</span>}
            </div>


            <div className="flex flex-wrap w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Direccion</label>
                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                type="text" placeholder="Direccion de domicilio" label="Direccion" {...register("address", { required: true })}
                />
                {errors.address && <span className="text-red-700">Campo requerido</span>}
            </div>

            <div className="flex flex-wrap mx-3 mb-2 mt-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Vacunado?
                        <input className="ml-2" type="checkbox" onChange={e=> setIsVaccinated(e.target.checked)} checked={isVaccinated} />
                    </label>
                    {errors.isVaccinated && <span className="text-red-700">Campo requerido</span>}
                </div>
            </div>

            {isVaccinated && (
                <>
                <div className="flex flex-wrap w-full mx-3 mb-2">
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Tipo de vacuna</label>
                            <select {...register("vaccineType")} className="form-select form-select-sm px-3 py-1 mr-2 text-sm border border-solid rounded">
                                <option key={VACCINATED_TYPE.Sputnik} value={VACCINATED_TYPE.Sputnik}>Sputnik</option>
                                <option key={VACCINATED_TYPE.AstraZeneca} value={VACCINATED_TYPE.AstraZeneca}>AstraZeneca</option>
                                <option key={VACCINATED_TYPE.Pfizer} value={VACCINATED_TYPE.Pfizer}>Pfizer</option>
                                <option key={VACCINATED_TYPE.JhonsonJhonson} value={VACCINATED_TYPE.JhonsonJhonson}>Jhonson&Jhonson</option>
                            </select>
                        {errors.vaccineType && <span className="text-red-700">Campo requerido</span>}
                    </div>
                </div>

                <div className="flex flex-wrap w-full mx-3 mb-2">
                    <div className="w-full px-3 md:mb-0">
                        <label className="block form-select form-select-sm px-3 py-1 mt-3 text-sm border border-rounded">Fecha de vacunacion:
                        <input className="ml-5" type="date" {...register("vaccinationdDate")}></input>
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Numero de dosis
                        </label>
                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        type="number"
                        {...register("dose", { pattern: /^[0-9]+$/ })}
                        />
                        {errors.dose && <span className="text-red-700">Campo requerido</span>}
                        {errors.dose && errors.dose.type === "pattern" && <span className="text-red-700">Solo numeros</span>}

                    </div>
                </div>
            </>
            )}
          
       </div>


        
                        


       <button type="submit" class="inline-flex items-center ml-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
           Actualizar
       </button>
      
       </form>
   )
}
 
export default UpdateEmployee