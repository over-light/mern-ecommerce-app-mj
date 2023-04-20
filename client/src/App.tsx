import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Llandingpage";
import { Header } from "./component/Header";
import VerifyUser from "./pages/auth/VerifyUser";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/verify-user/:id/verify/:token" element={<VerifyUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
