import { combineReducers } from "redux";

import reducerLocations from "~/reducers/locations";
import reducerLoading from "~/reducers/loading";

const reducers = combineReducers({
  reducerLocations,
  reducerLoading,
});

export default reducers;
