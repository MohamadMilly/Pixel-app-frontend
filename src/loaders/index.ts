import * as api from "../fakeapi";
import type { ApiClient } from "../shared/types/api";
import booksDetailsLoader from "./booksDetailsLoader";
import booksListLoader from "./booksListLoader";
import placeOrderLoader from "./placeOrderLoader";
import { rootLoader } from "./rootLoader";
import userOrdersLoader from "./userOrdersLoader";

function setUpLoaders(apiClient: ApiClient) {
  return {
    booksDetailsLoader: booksDetailsLoader(apiClient),
    booksListLoader: booksListLoader(apiClient),
    placeOrderLoader: placeOrderLoader(apiClient),
    rootLoader: rootLoader(apiClient),
    userOrdersLoader: userOrdersLoader(apiClient),
  };
}

const loaders = setUpLoaders(api);

export default loaders;
