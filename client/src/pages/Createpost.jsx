import  React, { useState } from "react"
import {useNavigate}  from 'react-router-dom'
import { preview } from "../assets"
import {getRandomPrompt} from '../utils'
import {FormField,Loader} from '../components'

const Createpost = () => {
       const navigate=useNavigate();
       const [form,setForm]=useState({
            name:'',
            prompt:'',
            photo:'',  
       });
       const [generatingimg,setGeneratingimg]=useState(false);
       const [loading,setLoading]=useState(false);
async function handleSubmit(e){
e.preventDefault();
if(form.prompt&&form.photo){
  setLoading(true);
  try {
   const response=await fetch('http://localhost:8080/api/v1/post',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(form)
   })
   await response.json();
   navigate('/');
  } catch (error) {
    alert(err)
  }
  finally{
    setLoading(false);
  }
}
else{
  alert('prompt to daal madrchod')
}
}
const handleChange=(e)=>{
 setForm({...form ,[e.target.name]:e.target.value})
}
const handleSupriseMe=()=>{
 const randomPrompt=getRandomPrompt(form.prompt)
 setForm({...form ,prompt:randomPrompt})
}
const generatingimage=async()=>{
  if(form.prompt){
    try {
      setGeneratingimg(true);
      const response=await fetch('http://localhost:8080/api/v1/dale',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({prompt:form.prompt}),
      })
      const data=await response.json();
      setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
    } catch (error) {
      alert(error);
    }
    finally{
      setGeneratingimg(false);
    }
  }
  else{
    alert('please enetr a prompt')
  }
}
  
       return (
    <section className="max-w-7xl mx-auto">
      
      <div>
              <h1 className='font-extrabold text-[#222328] text-[26px]'>
                Create     
              </h1>
              <p className='mt-2 text-[#666e75] text-[20px] max-w-[500px]'>
                create imagnative image with Dale-e
              </p>       
      
      </div>
      <form action="" className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
     <div className="fle flex-col gap-5">
      <FormField 
      LableName="your name"
      type='text'
      name='name'
      placeholder='lalaaa'
      value={form.name}
      handleChange={handleChange}/>
      <FormField 
      LableName="prompt"
      type='text'
      name='prompt'
      placeholder='hello my name is jonny sins'
      value={form.prompt}
      handleChange={handleChange}
      isSupriseMe
      handleSupriseMe={handleSupriseMe}/>
       <div className="relative bg-gray-50 border
        border-gray-300 text-gray-900 text-sm 
        rounded-lg focus:ring-blue-500 
        focus:border-blue-500 w-64 p-3 h-64
        flex justify-center items-center mt-3">
          {form.photo?(
            <img src={form.photo}
            alt={form.prompt}
            className='w-full h-full object-contain'/>
          ):(
            <img 
            src={preview}
            alt='preview'
            className="w-9/12 h-9/12 object-contain
            opacity-40"/>
          )}
          {generatingimg &&(
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <Loader />
            </div>
          )}
   </div>
     </div>
     <div className="mt-5 flex gap-5">
      <button
      type="button"
      onClick={generatingimage}
      className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          
      >
    {generatingimg ?'Generating...':'Generate'}
      </button>
     </div>
     <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]"> Once you have created the image you want, you can share it with others in the community </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Createpost
