import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async() => {
    try{

        const response = await Axios({
            ...SummaryApi.user_details,
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        if (!response.data) {
            console.log("No new data. Possibly served from cache.");
        } else {
            return response.data;
        }
    } catch(error) {
        console.log(error)
    }
}

export default fetchUserDetails;