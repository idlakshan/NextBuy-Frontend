import React, { useEffect, useState } from 'react'
import ConfirmBox from '../components/ConfirmBox'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'


const SubCategoryPage = () => {
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)
  const [ImageURL,setImageURL] = useState("")
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async()=>{
   
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])


  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
        </div>

        <div className='overflow-auto w-full max-w-[95vw]'>
        
        </div>


        {
          openAddSubCategory && (
            <UploadSubCategoryModel
              close={()=>setOpenAddSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          ImageURL &&
          <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
        }



        {
          openDeleteConfirmBox && (
            <ConfirmBox 
              cancel={()=>setOpenDeleteConfirmBox(false)}
              close={()=>setOpenDeleteConfirmBox(false)}
            />
          )
        }
    </section>
  )
}

export default SubCategoryPage