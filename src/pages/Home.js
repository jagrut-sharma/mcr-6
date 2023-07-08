import React, { useState } from "react";
import { useData } from "../context/dataContext";
import { Link } from "react-router-dom";
import { ACTIONS } from "../utils/ACTIONS";
// import { cuisineData, restaurantsData } from "../utils/data";

export default function Home() {
  const {
    dataState: { restaurantsData, cuisineData, selectedCuisine },
    dataDispatch,
  } = useData();

  const handleCuisine = (id) => {
    dataDispatch({ type: ACTIONS.CHANGE_CUISINE, payload: id });
  };

  const selectedRes = restaurantsData.filter(
    ({ cuisine_id }) => cuisine_id === selectedCuisine
  );

  return (
    <>
      <h1 className="text-3xl p-4 text-center font-bold">Food Ordering App</h1>
      <p className="text-2xl text-center font-bold">Select your cuisine:</p>

      <div className="flex justify-center mt-8">
        {cuisineData.map((cuisine) => (
          <button
            key={cuisine.id}
            className="text-lg mx-4 bg-emerald-600 px-3 py-1 rounded-md font-bold text-slate-50"
            onClick={() => handleCuisine(cuisine.id)}
          >
            {cuisine.name}
          </button>
        ))}
      </div>

      <main className="flex flex-col mt-8 gap-8 p-8 items-center">
        {selectedRes.map((res) => (
          <Link to={`/res/${res.id}`} key={res.id}>
            <h2 className="text-xl font-bold font-Libre">{`Dishes by ${res.name}:`}</h2>

            <div className="flex gap-6 flex-wrap mt-2">
              {res.menu.map((item, indx) => (
                <div className="border border-gray-300 rounded" key={indx}>
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-[15rem] h-[18rem] object-cover"
                  />
                  <p className="text-base font-bold p-2 w-full">{item.name}</p>
                  <p className="font-Libre text-sm px-2 w-full text-gray-500">{`${item.price} for ${item.qty}`}</p>
                  <p className="font-Libre text-sm p-2 pb-4 w-full text-gray-500">{`${res.name}`}</p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
