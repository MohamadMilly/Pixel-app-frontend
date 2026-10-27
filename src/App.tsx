import { Outlet, useLoaderData, useNavigation } from "react-router";
import Navbar from "./components/shared/Navbar";
import { Spinner } from "./components/ui/Spinner";

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { ordersCount } = useLoaderData();
  return (
    <>
      <header className="bg-background/50 backdrop-blur-md border-b border-secondary sticky top-0 z-9999">
        <Navbar ordersCount={ordersCount} />
      </header>
      {isLoading && <Spinner className="mt-6 mb-3" label="جار التحميل..." />}
      <Outlet />
    </>
  );
}

export { App };
