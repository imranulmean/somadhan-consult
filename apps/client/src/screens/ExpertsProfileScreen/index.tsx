import QB, {
  promisifyCall,
  QBAppointment,
  QBDataDeletedResponse,
} from '@qc/quickblox'
import { useEffect } from 'react';

export default function ExpertsProfileScreen() {

  useEffect(()=>{
    var params = {
      tags:['provider'],
      filter: 
      { 
        field: 'id',param: 'eq',value:139595113, 
      }
    };
    
    QB.users.listUsers(params, function(error, result) {
         
    });
  },[])

  return (
    <div className="providers-screen">
        <p>This is a profile Screen</p>
    </div>
  )
}
