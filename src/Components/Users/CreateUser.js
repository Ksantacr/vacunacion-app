import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL_API, BASE_OBJECT } from "../../constantsFile"
 
function CreateUser() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

    data = {...data, ...BASE_OBJECT, id: data.identificationCard}

     fetch(`${BASE_URL_API}employees`, {
       method: 'POST',
       headers: {
         Accept: 'application/form-data',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     })
     .then(res => {
         if(res.status == 201) {
            window.location.href = '/';
         } else {
             alert('Problema al crear empleado, intente de nuevo')
         }
     })
   }

   const isCedulaValid = (cedula) => {
       const reg = new RegExp('^[0-9]+$')
       return cedula.length == 10 && reg.test(cedula)
   }
 
   return (
       <form className="w-full max-w-lg mx-auto my-20" onSubmit={handleSubmit(onSubmit)}>
       <div className="flex flex-wrap mx-3 mb-2">
            <div className="w-full px-3 mb-3">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                    Cédula
                </label>
                <input className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                label="cedula"
                type="text" placeholder="Cédula"
                {...register("identificationCard", { required: true, validate: isCedulaValid })}
                />
                 {errors.identificationCard && errors.identificationCard.type === "required" && <p className="text-red-700 mb-3">Campo requerido</p>}
                 {errors.identificationCard && errors.identificationCard.validate === "pattern" && (<p className="text-red-700">Cedula invalida</p>)}
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
               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                   Correo
               </label>
               <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
               type="email"  placeholder="mail@test.com"
               label="Email"
               {...register("email", { required: true })}
               />
               {errors.email && <span className="text-red-700">Campo requerido</span>}

           </div>
       </div>
       <button type="submit" className="inline-flex items-center ml-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
           CREAR
       </button>
      
       </form>
   )
}
 
export default CreateUser