import { ACTIONS } from "../utils/ACTIONS";
import { cuisineData, restaurantsData } from "../utils/data";

export const initialDataState = {
  restaurantsData: restaurantsData,
  cuisineData: cuisineData,
};

export const dataReducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.TEST:
      break;

    default:
      break;
  }
};
