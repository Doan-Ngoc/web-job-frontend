import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useJob } from '../../hooks/useJob';
import * as authApi from '../../api/authenticate';
import toast from 'react-hot-toast';
import './Sidebar.css';

const Sidebar = () => {
  const { isLoggedIn, setAccessToken, accountRole } = useAuth();
  const { setCurrentPage } = useJob();
  const navigate = useNavigate();

  //Log out logic
  const handleLogout = async () => {
    //Remove refresh token
    await authApi.signout();
    setAccessToken(null);
    toast.success('Logged out successfully');
    navigate('/');
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
      <ul className="flex flex-col font-bold">
        <Link to="/">
          <li
            className="sidebar-item"
            onClick={() => setCurrentPage(1)}
          >
            <ion-icon name="home"></ion-icon>
            Home
          </li>
        </Link>
        {/* Sidebar menu if logged in */}
        {isLoggedIn ? (
          <div>
            <Link
              to={accountRole === 'applicant' ? '/job/applied' : '/job/created'}
            >
              <li className="sidebar-item">
                <ion-icon name="briefcase"></ion-icon>
                Manage Jobs
              </li>
            </Link>
            <Link to="/my-profile">
              <li className="sidebar-item">
                <i className="fa fa-user"></i>
                My Profile
              </li>
            </Link>
            {accountRole === 'company' && (
              <Link to="/job/new">
                <li className="sidebar-item">
                  <i className="fa fa-edit"></i>
                  Create New Job
                </li>
              </Link>
            )}
            {/* Log out/Log in button */}
            <button
              className="btn bg-white hover:bg-[#ffce00] m-6 gap-1"
              onClick={handleLogout}
            >
              <ion-icon name="log-in"></ion-icon>
              Log Out
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <li className="sidebar-item">
              <ion-icon name="log-in"></ion-icon>
              Sign In
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
