import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import './App.css'
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setLoadingCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setAllCategory, setAllSubCategory } from './store/productSlice';
import { handleAddItemCart } from './store/cartProducts';
import GlobalProvider from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobile';

function App() {
  const dispatch = useDispatch();


  const fetchUser = async() => {
    const userData = await fetchUserDetails();
    console.log('Data', userData.data)
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }

  const fetchCartItem = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.getCartItem
    });
    const { data: responseData } = response;
    if (responseData.success) {
      dispatch(handleAddItemCart(responseData.data))
    }
  } catch (error) {
    console.log(error);
  }
  };


  useEffect(() => {
    fetchUser(),
    fetchCategory(),
    fetchSubCategory(),
    fetchCartItem()
  }, [])
  

  return (
    <GlobalProvider>
    <Header/>
    <main className='min-h-[80vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
    }
    </GlobalProvider>
  )
}

export default App
