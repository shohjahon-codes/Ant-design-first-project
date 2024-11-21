import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/layout";
import { Home } from "./page/Home";
import { UserFormPage } from "./page/form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home/>} />
        <Route index path="/add" element={<UserFormPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
