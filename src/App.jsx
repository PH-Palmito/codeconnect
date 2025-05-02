import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginFolder/login";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path="/codeconnect" element={<Login />} />
  <Route path="/codeconnect/feed" element={<Feed />} />

</Routes>

    </BrowserRouter>
  );
}
