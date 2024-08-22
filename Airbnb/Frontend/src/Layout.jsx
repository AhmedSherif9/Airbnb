import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col gap-14 mx-auto w-8/12">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
