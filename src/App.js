import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import FlavorsPage from "./FlavorsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistoryPage from "./OrderHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/flavors"
          element={
            <ProtectedRoute>
              <FlavorsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;