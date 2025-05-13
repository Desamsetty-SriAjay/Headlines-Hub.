import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate();
  return (
    <header onClick={()=>navigate('/')} className='text-center text-black  text-2xl font-semibold  py-5 shadow-sm cursor-pointer bg-gray-200'>
      Headlines Hub
    </header>
  );
};

export default Header;
