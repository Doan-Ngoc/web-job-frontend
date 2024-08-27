import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from '../../utils/request';

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  async function onSearchFormSubmit(data) {
    const response = await request.post('/job/search', {
      searchTerm: data.searchTerm,
    })
    const receivedData = await response.data;
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
          required/>
        <button
          type="submit"
          className="btn bg-[#4c50d3] hover:bg-[#4c50d3] text-[#fff] join-item">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
