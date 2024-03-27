import { useEffect, useState } from 'react';
import { Link, useParams, useLocation  } from 'react-router-dom';
import QB, {
  promisifyCall,
  QBAppointment,
  QBDataDeletedResponse,
} from '@qc/quickblox'
import useComponent from './useComponent'
import BackSvg from '@qc/icons/navigation/arrow-left.svg'
import './styles.css'

export default function ExpertsProfileScreen() {

  const path=useLocation();
  console.log(path);
  const {
    handlers: { onBack,},
  } = useComponent()
  
  
  const { expertId } = useParams();
  const [expertsProfile, setExpertProfile] = useState<any>(null);
  const [customData, setCustomData]=useState<any>(null);
  const [profilePic, setProfilePic]=useState<any>("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    var params = {
      filter: { 
        field: 'id',
        param: 'eq',
        value: expertId,
      },      
    };    
    QB.users.listUsers(params, function(error, result) {
      if (error) {
        setError("Error fetching expert profile.");
      } else {
        const user1:any = result?.items[0]?.user;
        if (user1) {
          setExpertProfile(user1);
          // get user avatar if blob id not null
          if(user1.blob_id && user1.blob_id!==null){
            var blobId = user1.blob_id;
            QB.content.getInfo(blobId, function(error, result) {
              if (error) {
                setError("Get file information by ID error: " + JSON.stringify(error));
              } else {
                var fileUID:any = result?.blob.uid;                
                var fileUrl = QB.content.privateUrl(fileUID);
                setProfilePic(fileUrl);             
              }
            })            
          }
           
          //////////////////////////          
          if(user1.custom_data){
            try {
              const parsedCustomData: any = JSON.parse(user1?.custom_data || "");
              setCustomData(parsedCustomData);
            } catch (parseError) {
              setError("Error parsing custom data.");
            }
          }

        } else {
          setError("Expert profile not found.");
        }
      }
    });
  }, [expertId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!expertsProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-screen">
        <div className="profile-screen-header">
          <button className="back d-hidden" type="button" onClick={onBack}>
            <BackSvg className="icon" />
          </button>
          <p className="title header-title">{expertsProfile.full_name}</p>
        </div>    
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
              {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={profilePic} alt="Bonnie image"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{expertsProfile.full_name}</h5>
              {
                customData!=null &&
                <>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{customData.profession}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{customData.description}</span>                 
                </>               
              }

              <div className="flex mt-4 md:mt-6">
                  {/* <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
                  <Link to={`/providers/${expertsProfile.id}`} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Get Appintment</Link>
              </div>
          </div>
      </div>    
    </div>
  );
}