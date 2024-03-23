import './styles.css'
import QB, {
    promisifyCall,
    QBSession,
    QBUser,
    QBUserCustomData,
  } from '@qc/quickblox'
  
export default function ExpertsScreen(){

    const experts=[
        {name:"Neil Sims", post:"Lawyer", profilePic:"https://flowbite.com/docs/images/people/profile-picture-1.jpg",ratings:[1,2,3,4], reviews:'90,000', filled:true },
        {name:"Bonnie Green", post:"Urologist", profilePic:"https://flowbite.com/docs/images/people/profile-picture-2.jpg", ratings:[1,2,3,4], reviews:'8,000', filled:false },
        {name:"Michael Gough", post:"Lawyer", profilePic:"https://flowbite.com/docs/images/people/profile-picture-3.jpg", ratings:[1,2,3,4], reviews:'16,000', filled:true},
        {name:"Lana Byrd", post:"Lawyer", profilePic:"https://flowbite.com/docs/images/people/profile-picture-4.jpg", ratings:[1,2,3,4], reviews:'25,000', filled:true},
        {name:"Thomes Lean", post:"Lawyer", profilePic:"https://flowbite.com/docs/images/people/profile-picture-5.jpg", ratings:[1,2,3,4], reviews:'5,000', filled:false},
    ];    
    const getUserInfo=async()=>{
        const userInfo=await fetch("https://api.quickblox.com/users/139595113");
        console.log(userInfo);
    }
    return (
            <div className="providers-screen">
                <button onClick={getUserInfo}>Get User Info</button>
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                experts.map((exp,index)=>{
                                    return (
                                        <>
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={exp.profilePic} alt="Neil image"/>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {exp.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {exp.post}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        $320
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