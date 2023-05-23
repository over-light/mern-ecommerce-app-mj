import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landingpage";
import { Header } from "./component/Header";
import UpdatePassword from "./pages/auth/updatePassword";
import VerifyUser from "./pages/auth/VerifyUser";
import CustomSnackbar from "./component/CustomSnackbar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./pages/Products/ProductList";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <CustomSnackbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/:id/verify/:token" element={<VerifyUser />} />
        <Route path="/user/:id/update-password/:token" element={<UpdatePassword />} />
        <Route path="/product" element={<ProductList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
