import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout } from "./layout/BasicLayout";
import { PageHome } from "./pages/home/PageHome";
import { PageCarListing } from "./pages/auto/PageCarListing";
import { PageCarListingInner } from "./pages/auto/PageCarListingInner";
import { PageAbout } from "./pages/about/PageAbout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={BasicLayout}>
          <Route index path="/" element={<PageHome />} />
          <Route path="/auto-list" element={<PageCarListing />} />
          <Route path="/auto-list/:id" element={<PageCarListingInner />} />
          <Route path="/about" element={<PageAbout />} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path="/register" element={<></>} />
          <Route path="/login" element={<></>} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path="/account" element={<></>} />
          <Route path="/account/my-auto-list" element={<></>} />
          <Route path="/account/my-auto-list/create" element={<></>} />
          <Route path="/account/my-auto-list/view" element={<></>} />
          <Route path="/account/my-auto-list/edit" element={<></>} />
          <Route path="/account/my-auto-list/delete" element={<></>} />
          <Route path="/account/settings" element={<></>} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
