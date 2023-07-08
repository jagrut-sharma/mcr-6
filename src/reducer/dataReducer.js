import { ACTIONS } from "../utils/ACTIONS";
import { cuisineData, restaurantsData } from "../utils/data";

export const initialDataState = {
  restaurantsData: restaurantsData,
  cuisineData: cuisineData,
  selectedCuisines: "",
};

export const dataReducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.ADD_COMMENT: {
      const selectedRes = draft.restaurantsData.find(
        ({ id }) => id === +action.payload.resID
      );
      selectedRes.ratings.push(action.payload.review);

      break;
    }

    default:
      break;
  }
};
