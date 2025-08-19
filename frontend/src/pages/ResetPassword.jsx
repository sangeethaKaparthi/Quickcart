
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    console.log("reset page", location)
    const [data,setData] = useState({
    email : "",
    newPassword : "",
    confirmPassword : ""
  })
    const validValue = Object.values(data).every(el => el)

    useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/")
    }

    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email : location?.state?.email
            }
        })
    }
  },[])
  console.log("data reset password", data);

  const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
  }

     const handleSubmit = async (e) => {
      e.preventDefault();

      if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same.")
        return
      }

      try {
        const response = await Axios({
        ...SummaryApi.reset_password,
        data : data
      })

      if(response.data.error){
           toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
        setData({
            email : "",
            newPassword : "",
            confirmPassword : ""
        })
        
        navigate("/login")
      }
      console.log(response)

      } catch(error) {
        AxiosToastError(error)
      }
    }


  return (
          <section className='w-full container mx-auto px-2'>
                <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                  <p className='font-semibold text-lg'>Enter Your New Password</p>
                  <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                              <div className='grid gap-1'>
                                     <label htmlFor='newpassword'>New Password: </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id='newpassword'
                                                autoFocus
                                                className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                                                placeholder='Enter your new password'
                                                name='newPassword'
                                                onChange={handleChange}
                                                value={data.newPassword}
                                            />
                                                
                                                <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </div>
                            </div>

                             <div className='grid gap-1'>
                                     <label htmlFor='confirmpassword'>Confirm Password: </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id='confirmpassword'
                                                autoFocus
                                                className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                                                placeholder='Enter your confirm password'
                                                name='confirmPassword'
                                                onChange={handleChange}
                                                value={data.confirmPassword}
                                            />
                                                
                                        <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                        </div>
                            </div>
                        <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>
                          Change Password
                        </button>
                  </form>
                  <p>
                     Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                   </p>
          
                </div>
        </section>
  )
}

export default ResetPassword