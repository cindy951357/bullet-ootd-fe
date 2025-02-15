import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ViewItems from "./pages/ViewItems";
import AddItems from "./pages/AddItems";
import OOTDCalendar from "./pages/OutfitCalendar";
import AddOOTD from "./pages/AddOutfit";
import "./i18n";

const App = () => {
  return (
    <Router>
      <div className="just-under-router grid grid-rows-[auto_1fr_auto] h-full max-h-full">
        <Header />
        <main className="flex justify-center h-fit">
          <Routes>
            <Route path="/" element={<OOTDCalendar />} />
            <Route path="/view-items" element={<ViewItems />} />
            <Route path="/add-item" element={<AddItems />} />
            <Route path="/add-outfit" element={<AddOOTD />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

