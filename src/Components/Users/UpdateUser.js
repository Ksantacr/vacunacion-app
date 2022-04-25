import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { BASE_URL_API } from "../../constantsFile"
import { useForm } from "react-hook-form";

 
function UpdateUser() {
    const { id } = useParams();
    const [ resultApi, setResultApi ] = useState({})
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
            if(res.status === 200) {
                window.location.href = '/';
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
            
            setValue("fname", result.fname)
            setValue("lname", result.lname)
            setValue("identificationCard", result.identificationCard)
            setValue("email", result.email)
            setResultApi(result)
        }
      )
  }, [id])

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
               Nombres
           </label>
           <input
           className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
           type="text"
           placeholder="Nombres"
           label="Nombres"
           {...register("fname", { required: true, pattern: /^[A-Za-z ]+$/i })}
           />
           {errors.fname && errors.fname.type === "required" && <span className="text-red-700 mb-3">Campo requerido</span>}
           {errors.fname && errors.fname.type === "pattern" && (<p className="text-red-700">Solo valores alfabeticos</p>)}

           </div>
           <div className="w-full md:w-1/2 px-3">
           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
           for="grid-last-name">
               Apellidos
            </label>
           <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
           type="text" placeholder="Apellidos"
           label="Apellidos"
           {...register("lname", { required: true, pattern: /^[A-Za-z]+$/i })}
           />
           {errors.lname && <span className="text-red-700">Campo requerido</span>}
           </div>
       </div>
       <div className="flex flex-wrap mx-3 mb-2">
           <div className="w-full px-3 mb-6 md:mb-0">
               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                   Correo
               </label>
               <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
               type="email"  placeholder="mail@test.com"
               label="Email"
               {...register("email", { required: true })}
               />
               {errors.email && <span className="text-red-700">Campo requerido</span>}

           </div>
       </div>
       <button type="submit" class="inline-flex items-center ml-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
           Actualizar
       </button>
      
       </form>
   )
}
 
export default UpdateUser;