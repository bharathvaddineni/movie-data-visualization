import Footer from "./components/Footer";
import Header from "./components/Header";
// import DashboardOverviewPage from "./components/DashboardOverviewPage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-stone-800">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
