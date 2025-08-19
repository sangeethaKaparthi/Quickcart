import React, {useState} from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from "../utils/Axios";
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/ConfirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const [openUploadCategory,setOpenUploadCategory] = useState(false);
  const [loading,setLoading] = useState(false);
  const [categoryData,setCategoryData] = useState([]);
  const [openEdit,setOpenEdit] = useState(false);
  const [editData,setEditData] = useState({
        name : "",
        image : "",
      })
  const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
  })

  const fetchCategory = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory,
        headers: {
          'Cache-Control': 'no-cache' // Prevent browser from using cached response
        }
      })
      const {data : responseData} = response 
      if(responseData.success){
        setCategoryData(responseData.data)
      }
      console.log(response)
    } catch(error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCategory();
  }, [])
  // const allCategory = useSelector(state => state.product.allCategory)
  // console.log('all category', allCategory)

  const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)}  className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData/>
        )
      }
      {
        loading && (
          <Loading/>
        )
      }
      <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {
                categoryData.map((category,index)=>{
                    return(
                        <div className='w-28 h-54 rounded shadow-md' key={category._id}>
                            <img 
                                alt={category.name}
                                src={category.image}
                                className='w-full object-scale-down'
                            />
                            <div className='items-center h-9 flex gap-2'>
                                <button 
                                className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                                onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(category)
                                }}
                                >
                                    Edit
                                </button>
                                <button 
                                onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory(category)
                                }}
                                className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
        )
      }

      {
            openEdit && (
                <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
            )
        }

        {
           openConfimBoxDelete && (
            <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
           ) 
        }
    </section>
  )
}

export default CategoryPage
