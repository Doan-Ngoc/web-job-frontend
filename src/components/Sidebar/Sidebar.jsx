import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../features/auth/auth-slice';
import './Sidebar.css';
import toast from 'react-hot-toast';
import * as authApi from '../../api/auth';

const Sidebar = ({ setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
  console.log('')
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const onLogoutBtnClick = () => {
  //   dispatch(authActions.logout());
  //   navigate('/signin');
  // };

  const handleLogout = () => {
    // Delete item from localStorage
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };
  return (
    <div className="sidebar py-5 flex flex-col justify-around text-[#fff] bg-[#4c50d3]">
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
        {isLoggedIn ? (
          <button
            className="btn bg-white hover:bg-[#ffce00] m-10 gap-2"
            onClick={handleLogout}
          >
            <ion-icon name="log-in" size="large"></ion-icon>
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <li className="sidebar-item flex items-center hover:bg-[#494bc2] pl-10 py-4 gap-2 cursor-pointer text-lg">
              <ion-icon name="log-in"></ion-icon>
              Sign In
            </li>
          </Link>
        )}

      </ul>

    </div>
  );
}

export default Sidebar;
