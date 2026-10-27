import type { RouteObject } from "react-router";
import { App } from "./App";
import loaders from "./loaders";
import { BooksListPage } from "./pages/BooksListPage";
import { BooksListRedirect } from "./pages/BooksListRedirect";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { GlobalErrorBoundary } from "./components/shared/errors/GlobalErrorBoundary";
import { PlaceOrderPage } from "./pages/PlaceOrderPage";
import placeOrderAction from "./actions/placeOrderAction";
import { UserOrdersPage } from "./pages/UserOrdersPage";
import userOrdersAction from "./actions/userOrdersAction";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: loaders.rootLoader,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        index: true,
        element: <BooksListRedirect />,
      },
      {
        path: "bookslist",
        element: <BooksListPage />,
        loader: loaders.booksListLoader,
      },
      {
        path: "bookslist/:bookId/details",
        element: <BookDetailsPage />,
        loader: loaders.booksDetailsLoader,
      },
      {
        path: "bookslist/:bookId/order",
        element: <PlaceOrderPage />,
        loader: loaders.placeOrderLoader,
        action: placeOrderAction,
      },
      {
        path: "orders",
        element: <UserOrdersPage />,
        loader: loaders.userOrdersLoader,
        action: userOrdersAction,
      },
    ],
  },
];

export default routes;
