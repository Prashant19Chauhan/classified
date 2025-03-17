import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import { fetchAdsByUser } from '../../api/adsService';

const DashboardHome = () => {
  const currentUser = useSelector(state => state.user);
  const userDetail = currentUser.currentUser
  const user = userDetail.findUser;
  const userId = user.firebaseUID;
  
  useEffect(()=>{
    const fetchAllAds = async() => {
      const data = await fetchAdsByUser({userId});
      console.log(data);
    }
    fetchAllAds();
  })

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Ads</h2>
      <div>
        
      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  );
};
  
  export default DashboardHome;
  