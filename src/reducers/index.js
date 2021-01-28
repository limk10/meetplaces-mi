import { combineReducers } from "redux";

import reducerLocations from "~/reducers/locations";
import reducerLoading from "~/reducers/loading";
import reducerUser from "~/reducers/user";

const reducers = combineReducers({
  reducerLocations,
  reducerLoading,
  reducerUser,
});

export default reducers;
