import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../features/auth/auth-slice';
import { useEffect, useState } from 'react';
import './Sidebar.css';
const refreshToken = localStorage.getItem('refreshToken');
const isUserLoggedIn = !!refreshToken;

const Sidebar = ({ setCurrentPage, isLoggedIn }) => {
  console.log(localStorage.getItem('isLoggedIn'));
  console.log('tình trạng login', isLoggedIn);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [role, setRole] = useState('');
  // useEffect(() => {
  //   // Read the isLoggedIn value from local storage
  //   const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  //   const storedRole = localStorage.getItem('role');
  //   // Update the state with the value from local storage
  //   setIsLoggedIn(Boolean(storedIsLoggedIn));
  //   console.log('is logged in:', isLoggedIn);
  // }, []);

  return (
    <div className="sidebar py-5 flex flex-col justify-between text-[#fff] bg-[#4c50d3]">
      <Link to="/">
        <h1
          className="text-3xl font-black mt-10 cursor-pointer"
          onClick={() => setCurrentPage(1)}
        >
          JobsConnect
        </h1>
      </Link>
      <ul className="flex flex-col font-bold ">
        <Link to="/">
          <li
            className="sidebar-item flex items-center hover:bg-[#494bc2] pl-10 py-4 gap-2 cursor-pointer text-lg "
            onClick={() => setCurrentPage(1)}
          >
            <ion-icon name="home"></ion-icon>
            Home
          </li>
        </Link>
        <Link to="/job/created">
          <li className="sidebar-item flex items-center hover:bg-[#494bc2] pl-10 py-4 gap-2 cursor-pointer text-lg">
            <ion-icon name="briefcase"></ion-icon>
            Manage Jobs
          </li>
        </Link>
        <Link to="/job/new">
          <li className="sidebar-item flex items-center hover:bg-[#494bc2] pl-10 py-4 gap-2 cursor-pointer text-lg">
            <i className="fa fa-edit"></i>
            Create New Job
          </li>
        </Link>
        {!isUserLoggedIn && (
          <Link to="/signin">
            <li className="sidebar-item flex items-center hover:bg-[#494bc2] pl-10 py-4 gap-2 cursor-pointer text-lg">
              <ion-icon name="log-in"></ion-icon>
              Sign In
            </li>
          </Link>
        )}
      </ul>
      {isUserLoggedIn && (
        <button className="btn bg-white hover:bg-[#ffce00] m-10 gap-2">
          <ion-icon name="log-in" size="large"></ion-icon>
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
