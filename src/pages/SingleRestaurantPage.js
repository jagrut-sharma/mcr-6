import React from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../context/dataContext";
import { BsFillArrowLeftCircleFill, BsStarFill } from "react-icons/bs";
import ReviewModal from "../components/ReviewModal";

export default function SingleRestaurantPage() {
  const { resID } = useParams();
  const {
    dataState: { restaurantsData },
  } = useData();

  const selectedRes = restaurantsData.find(({ id }) => id === +resID);

  const menuItems = selectedRes.menu.reduce(
    (acc, item, i) => (i === 0 ? item.name : `${acc}, ${item.name}`),
    ""
  );

  const avgRating = selectedRes.ratings.reduce(
    (acc, curr) => acc + curr.rating / selectedRes.ratings.length,
    0
  );

  return (
    <main className="flex flex-col p-4 items-center mt-4">
      <Link to={"/"} className="text-emerald-600 fixed top-0 left-0 m-4">
        <BsFillArrowLeftCircleFill size={"3rem"} />
      </Link>
      <div className="w-[60%] flex justify-between items-center border-b-2">
        <div>
          <h1 className="text-4xl font-Libre font-bold text-emerald-700">
            {selectedRes.name}
          </h1>

          <p className="text-gray-500">{menuItems}</p>
          <p className="text-gray-500">
            {selectedRes.address}, {selectedRes.phone}
          </p>
          <p className="text-gray-500 pb-4">
            Average Rating: {avgRating.toFixed(1)}
          </p>
        </div>

        <ReviewModal />
      </div>

      <div className="w-[60%]">
        <h2 className="text-2xl font-bold font-Libre mt-4 text-emerald-700">
          Reviews
        </h2>

        <div className="mt-2">
          {selectedRes.ratings.map((rating, i) => (
            <div key={i} className="my-4 pb-2 border-b">
              <div className="flex justify-between">
                <div className="flex gap-1 font-bold items-center">
                  <img
                    src={rating.pp}
                    alt={rating.revName}
                    className="w-[1.8rem] h-[1.8rem] rounded-full"
                  />
                  {rating.revName}
                </div>

                <div className="flex items-center gap-1 bg-emerald-600 px-[10px] rounded-md text-slate-50 font-bold">
                  {rating.rating}
                  <BsStarFill size={"1rem"} />
                </div>
              </div>

              <p className="mt-2">{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
