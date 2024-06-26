import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NaveBar_SideBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer limit={4} />
    </BrowserRouter>
  );
}

export default App;
