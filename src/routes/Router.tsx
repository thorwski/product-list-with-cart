import { BrowserRouter, Route, Routes } from "react-router-dom";
import Desserts from "../pages/Desserts/Desserts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desserts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
