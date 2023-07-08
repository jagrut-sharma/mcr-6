import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useImmer } from "use-immer";
import { initialReviewData } from "../utils/constants";
import { useData } from "../context/dataContext";
import { ACTIONS } from "../utils/ACTIONS";
import { useParams } from "react-router-dom";

export default function ReviewModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useImmer(initialReviewData);
  const [error, setError] = useState("");
  const {
    dataDispatch,
    dataState: { restaurantsData },
  } = useData();
  const { resID } = useParams();

  function closeModal() {
    setError("");
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    setError("");
    setReview((draft) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.rating === "select rating") {
      setError("Please add rating");
      return;
    } else if (review.comment.trim() === "") {
      setError("Please add comment");
      return;
    }

    dataDispatch({ type: ACTIONS.ADD_COMMENT, payload: { review, resID } });
    setReview(initialReviewData);
    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="text-lg bg-emerald-600 px-3 py-1 rounded-md font-bold text-slate-50 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Review
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-Libre font-bold leading-6 text-emerald-800"
                  >
                    Add your review
                  </Dialog.Title>

                  {error.length > 0 && (
                    <p className="text-base my-2 text-center text-red-600 font-bold">
                      {error}
                    </p>
                  )}
                  <div>
                    <div className="flex justify-between mt-4">
                      <label
                        htmlFor="rating"
                        className="font-semibold text-base"
                      >
                        Rating:{" "}
                      </label>
                      <select
                        name="rating"
                        id="rating"
                        className="border-2 border-gray-400 rounded-md text-black"
                        value={review.rating}
                        onChange={handleChange}
                      >
                        <option value="select rating">Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="mt-2 flex justify-between">
                      <p className="font-semibold text-base">Comment:</p>
                      <textarea
                        name="comment"
                        id=""
                        cols="30"
                        rows="5"
                        className="border-2 resize-none p-[5px]"
                        value={review.comment}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
