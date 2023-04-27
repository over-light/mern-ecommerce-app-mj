import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Llandingpage";
import { Header } from "./component/Header";
import VerifyUser from "./pages/auth/VerifyUser";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/:id/verify/:token" element={<VerifyUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
