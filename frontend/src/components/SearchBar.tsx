import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const handleClear = () => {
    // Reset all input values to their initial state or to empty values
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(1);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-transparent rounded grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 rounded-lg"
      style={{ fontFamily: 'Segoe UI, sans-serif' }}
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg justify-center boxs">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Location?"
          className="text-md w-full focus:outline-none text-center placeholder-black "
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-1 rounded-lg justify-center boxs">
        <label className="items-center flex justify-center">
          Distance:
          <select
            className="p-1 focus:outline-none font-bold rounded-lg text-center"
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          >
            {[...Array(5)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
        <label className="items-center flex justify-center">
          Beds:
          <select
            className="p-1 focus:outline-none font-bold rounded-lg text-center"
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          >
            {[...Array(4)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg text-center boxs"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg text-center boxs" 
          wrapperClassName="min-w-full"
        />
      </div>
      <div></div>
      <div className="flex gap-1">
        <button className="w-1/2 bg-blue-600 text-white h-5/6 p-2 font-bold text-xl hover:bg-blue-500 rounded-lg boxs">
          Search
        </button>
        <button type="button" onClick={handleClear} className="w-1/2 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded-lg boxs">
          Clear
        </button>
      </div>
    </form>
  ); 
};

export default SearchBar;
