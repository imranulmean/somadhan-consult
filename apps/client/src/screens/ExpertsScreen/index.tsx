import { useEffect, useState } from 'react';
import './styles.css'
import QB, {
    promisifyCall,
    QBAppointment,
    QBDataDeletedResponse,
  } from '@qc/quickblox'
  import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';

export default function ExpertsScreen(){
    const path=useLocation();
    const sessionToken = localStorage.getItem('sessionToken');
    console.log("sessionToken: ", sessionToken);
    const [experts, setExperts]=useState<any[]>([]); 

    useEffect(() => {

      const getAllExperts = async () => {
        var searchParams = {
          tags: "provider",
          page: 1,
          per_page: 50
        };
    
        QB.users.get(searchParams, function (error, result) {
          if(error){
            console.log("Fetching Errors: ",JSON.stringify(error));
          }
          if (result && result.items) {
            const providerArray = result.items.map(async (item) => {
              const user:any = item.user;
              if (user.blob_id && user.blob_id !== null) {
                const blobId = user.blob_id;
                try {
                  const expertBlob:any = await new Promise((resolve, reject) => {
                    QB.content.getInfo(blobId, (error, result) => {
                      if (error) reject(error);
                      else resolve(result);
                    });
                  });
                  const fileUID:any = expertBlob?.blob.uid;
                  const fileUrl = QB.content.privateUrl(fileUID);
                  user['profilePic'] = fileUrl;
                } catch (error) {
                  console.error("Error fetching profile picture:", error);
                }
              }
              user["rating"] = 5;
              if(user.custom_data!==null){
                  const parsedCustomData: any = JSON.parse(user.custom_data || "");
                  user['profession']=parsedCustomData.profession
              }
              
              return item;
            });
    
            Promise.all(providerArray).then((updatedProviders) => {
              setExperts(updatedProviders);
            }).catch((error) => {
              console.error("Error updating experts:", error);
            });
          }
        });
      };
      
        getAllExperts();
      }, []);

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
                                                        {
                                                            exp.user.profilePic ?
                                                            <img className="w-16 h-16 rounded-full" src={exp.user.profilePic} alt="Neil image"/>
                                                            :
                                                            <img className="w-16 h-16 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Neil image"/>
                                                        }
                                                        
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                                                            {exp.user.full_name}
                                                        </p>
                                                        <p className="text-sm text-gray-700 truncate dark:text-gray-400">
                                                            {exp.user.profession}
                                                        </p>
                                                        <p className="text-xs text-gray-600 truncate dark:text-gray-400">
                                                            {exp.user.email}
                                                        </p>                                                        
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        <Link to={`/experts/${exp.user.id}`} style={{"background":"rgb(66 133 244)"}} className="p-2 text-white hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
                                                            {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                                            </svg>                                    */}
                                                            See Profile                                                         
                                                        </Link>
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