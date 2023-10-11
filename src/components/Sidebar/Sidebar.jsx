import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div className="sidebar p-10 flex flex-col justify-between text-[#fff] bg-[#4c50d3]">
      <Link to="/">
        <h1
          className="text-3xl font-black mt-10 cursor-pointer"
          onClick={() => setCurrentPage(1)}
        >
          JobsConnect
        </h1>
      </Link>
      <ul className="flex flex-col gap-6 font-bold">
        <Link to="/">
          <li
            className="flex items-center gap-2 cursor-pointer text-lg cursor-pointer"
            onClick={() => setCurrentPage(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.713-.288T14 20v-5q0-.425-.288-.713T13 14h-2q-.425 0-.713.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.413-.588T4 19Z"
              />
            </svg>
            Home
          </li>
        </Link>
        <li className="flex items-center gap-2 cursor-pointer text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13 21q-.425 0-.713-.288T12 20q0-.425.288-.713T13 19h6V5h-6q-.425 0-.713-.288T12 4q0-.425.288-.713T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-6Zm-1.825-8H4q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.263-.713t.288-.687l1.85-1.85Z"
            />
          </svg>
          Log In
        </li>
      </ul>
      <button className="btn gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h6q.425 0 .713.288T12 4q0 .425-.288.713T11 5H5v14h6q.425 0 .713.288T12 20q0 .425-.288.713T11 21H5Zm12.175-8H10q-.425 0-.713-.288T9 12q0-.425.288-.713T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.713.288t-.712-.313q-.275-.3-.263-.713t.288-.687l1.85-1.85Z"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
