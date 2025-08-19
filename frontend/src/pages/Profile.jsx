import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData.name && !userData.email && !userData.mobile) {
      setUserData({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
      });
    }
  }, [user, userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("API Config:", SummaryApi.updateUserDetails);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
        headers: {
          ...SummaryApi.updateUserDetails.headers,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "If-None-Match": null,
          "If-Modified-Since": null,
        },
      });

      console.log("Full Response:", response);

      if (response.status === 304) {
        const userData = await fetchUserDetails();
        if (userData?.data) {
          dispatch(setUserDetails(userData.data));
          toast.success("No changes detected, user data refreshed.");
        } else {
          toast.error("Failed to refresh user data.");
        }
        return;
      }

      const { data: responseData } = response;
      if (responseData && responseData.success) {
        toast.success(responseData.message || "Profile updated successfully.");
        const userData = await fetchUserDetails();
        if (userData?.data) {
          dispatch(setUserDetails(userData.data));
          console.log("profile data", userData.data);
        }
      } else if (responseData) {
        toast.error(responseData.message || "Update failed.");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
           <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                {user.avatar ? (
                      <img 
                      alt={user.name}
                      src={user.avatar}
                       className="w-full h-full object-cover"
                      />
                ) : (
                  user?.name?.[0]?.toUpperCase()
             )}
            </div>
             <button onClick={()=>setProfileAvatarEdit(true)}
             className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
             {
             openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
            )
            }
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;