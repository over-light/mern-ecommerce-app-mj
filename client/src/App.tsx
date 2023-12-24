import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./component/Header";
import UpdatePassword from "./pages/auth/updatePassword";
import VerifyUser from "./pages/auth/VerifyUser";
import CustomSnackbar from "./component/CustomSnackbar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./pages/Products/ProductList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Cart } from "./pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <CustomSnackbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/:id/verify/:token" element={<VerifyUser />} />
        <Route path="/user/:id/update-password/:token" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
