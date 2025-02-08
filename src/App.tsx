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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
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

