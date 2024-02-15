import axios from "axios";

export const fetchDashboardData = async () => {
    try{
        const res = await axios.get('https://api.waqi.info/feed/here/?token=ad48fd74e87bd3ad9ef5a7715dd13ac1a86f6b3e')
        if (res.status !== 200) {
            throw new Error('Failed to fetch dashboard data');
          }
          const data  = res.data;
          console.log('data: ',data)
          return data;
    }catch(error){
        console.log(error)
    }
    
}