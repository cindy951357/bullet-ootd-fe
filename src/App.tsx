import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddItems from "./pages/AddItems";
import OOTDCalendar from "./pages/OutfitCalendar";
import AddOOTD from "./pages/AddOutfit";
import "./i18n";

const App = () => {
  return (
    <Router>
      <div className="just-under-router grid grid-rows-[auto_1fr_auto] h-screen max-h-screen">
        <Header />
        <main className="flex justify-center">
          <Routes>
            <Route path="/" element={<OOTDCalendar />} />
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

