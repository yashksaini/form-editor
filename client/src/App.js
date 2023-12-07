import { Route, Routes, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Forms from "./pages/Forms";
import Preview from "./pages/Preview";
import FillForm from "./pages/FillForm";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/create" Component={Create} />
          <Route path="/forms" Component={Forms} />
          <Route path="/preview" Component={Preview} />
          <Route path="/fillForm/:id" Component={FillForm} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
