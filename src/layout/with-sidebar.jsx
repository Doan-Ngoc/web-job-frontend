import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

export default function SidebarLayout({ setCurrentPage }) {
  return (
    <div className="App">
      <Sidebar setCurrentPage={setCurrentPage} />
      <section className="page-content p-20 overflow-y-scroll">
        <Outlet />
      </section>
    </div>
  );
}
