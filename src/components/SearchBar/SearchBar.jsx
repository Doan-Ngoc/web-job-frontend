import "./SearchBar.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  async function onSearchFormSubmit(data) {
    const response = await fetch("http://localhost:3000/job/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: data.searchTerm,
      }),
    });
    const receivedData = await response.json();
    if (receivedData) {
      const queryString = data.searchTerm.replace(/ /g, "-");
      navigate(`/job/search?q=${queryString}`, {
        state: { searchResult: receivedData },
      });
    } else {
      console.log("Searching failed");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSearchFormSubmit)}>
      <div className="join w-full">
        <input
          className="form-control input join-item w-full"
          name="searchTerm"
          placeholder="Search for jobs or companies"
          {...register("searchTerm")}
          required
        />
        <button
          type="submit"
          className="btn bg-[#4c50d3] hover:bg-[#4c50d3] text-[#fff] join-item"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
