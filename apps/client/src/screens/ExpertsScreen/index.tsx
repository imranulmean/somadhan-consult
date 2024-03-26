import { useEffect, useState } from 'react';
import './styles.css'
import QB, {
    promisifyCall,
    QBAppointment,
    QBDataDeletedResponse,
  } from '@qc/quickblox'

export default function ExpertsScreen(){
    const sessionToken = localStorage.getItem('sessionToken');
    console.log("sessionToken: ", sessionToken);
    const [experts, setExperts]=useState<any[]>([]); 
    useEffect(()=>{
        const getAllExperts=async()=>{
            var searchParams = {
                tags: "provider", //substring search
                page: 1,
                per_page: 50
              };    
              QB.users.get(searchParams, function(error, result) {
                console.log("Greeting the result:", result);
                if (result && result.items) {
                  const providerArray:any[]=result.items;
                  for(let i of providerArray){
                    i.user["rating"]=5;
                  }
                  setExperts(providerArray);
                }       
              });        
        }
        getAllExperts();
    },[]);   

    return (
            <div className="providers-screen">                
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                experts.map((exp,index)=>{
                                    return (
                                        <>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="Neil image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {exp.user.full_name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {exp.user.email}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">                                                     
                                                        <button type="button" className="bg-blue-700 p-2 text-white hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
                                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                                            </svg>                                   
                                                            Add                                                            
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    )
                                })
                            }               
                        </ul>
                    </div>
              </div>                                 
            </div>
        )
}