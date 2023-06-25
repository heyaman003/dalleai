import React,{useState,useEffect} from 'react'
import {FormField,Loader } from '../components'
import Card from '../components/Card'
const RenderCard = ({ data, title }) => {
       
       if (data?.length > 0) {
         return (
           data.map((post) => <Card key={post._id} {...post} />)
         );
       }
     
       return (
         <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
       );
     };
const Home = () => {
   const [loading,setLoading]=useState(false);    
   const [allPost,setAllPost]=useState(null);    
   const [searchText,setSearchText]=useState('');  
   const [searchResults,setSearchResults]=useState(null);
   const [searchTimeout,setSearchTimeout]=useState(null);
    const fetchPosts = async () => {
       setLoading(true);
   
       try {
         const response = await fetch('http://localhost:8080/api/v1/post', {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
           },
         });
   
         if (response.ok) {
           const result = await response.json();
           setAllPost(result.data.reverse());
         }
       } catch (err) {
         alert(err);
       } finally {
         setLoading(false);
       }
     };
   
     useEffect(() => {
       fetchPosts();
     }, []);
  
const handleSerachChange=(e)=>{
  clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(setTimeout(() => {
      const searchResult=allPost.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())||item.
      prompt.toLowerCase().includes(searchText.toLowerCase()));
      setSearchResults(searchResult)
    }, 500))
      
    
    
 }



  return (
   
   <section className='max-w-7xl mx-auto'>
       <div>
              <h1 className='font-extrabold text-[#222328] text-[24px]'>
                The Community Showcase     
              </h1>
              <p className='mt-4 text-[#666e75] text-[15px] max-w-[800px]'>
                Create and browse through  an imignary and powerfull visual generate image from your text prompt
              </p>       
       </div>
       <div className='mt-8'>
         <FormField
         LableName='Search post'
         type='text'
         name='text'
         placeholder="Search post"
         value={searchText}
         handleChange={handleSerachChange}/> 
       </div>
       <div className="mt-10">
              {loading?(
                     <div className="flex justify-center items-center">
                      <Loader/>
                     </div>
              ):(<>
                {searchText&&(
                     <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                            Showing result for your <span className="text-[#222328]">{searchText}</span>
                     </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {searchText?(
                     <RenderCard data={searchResults} title="no search results found"/>
                    ):(
                     <RenderCard
                     data={allPost}
                     title='no post found'
                     />
                    )}
                     </div> 
              </>
              )}
       </div>
   </section>
   
  )
}

export default Home;
