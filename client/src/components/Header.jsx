import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
 
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  


  return (
   <header className='bg-slate-200'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to ='/' >
    <h1 className='font-bold text-sm sm:text-xl flex-wrap'>     
        <span className='text-slate-500'>Taniva </span>
        <span className='text-slate-700'>Estate</span>
    </h1>
    </Link>
    <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input type="text"
         placeholder='Search..' 
         className='bg-transparent focus:outline-none w-24 sm:w-64'
         value={searchTerm}
         onChange={(e)=>{setSearchTerm(e.target.value)}} 
          />
        <button>
        <FaSearch className='text-slate-600'/>

        </button>
    </form>
    <ul className='flex gap-4 '>
        <Link to ='/'>
        <li className='hidden sm:inline text-slate-700  hover:underline '>Home</li>
        </Link>
        <Link to ='/about'>
        <li className='hidden sm:inline text-slate-700  hover:underline' >About</li>
        </Link>

      <Link to={currentUser ? '/profile' : '/sign-in'}>
  {currentUser ? (
    <img
  src={
    currentUser?.avatar?.trim()
      ? currentUser.avatar
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  onError={(e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }}
  alt='profile'
  className='w-8 h-8 rounded-full object-cover'
/>
  ) : (
    <li className='text-slate-700 hover:underline'>Sign in</li>
  )}
</Link>
    </ul>
    </div>
    </header>

  
  )
};


