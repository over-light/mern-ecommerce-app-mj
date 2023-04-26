import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Llandingpage";
import { Header } from "./component/Header";
import VerifyUser from "./pages/auth/VerifyUser";
<<<<<<< HEAD
=======
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
>>>>>>> 23cff9b89f8bec17e19a5099e677dbb2a0a9e52c

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
