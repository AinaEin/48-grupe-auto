import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasicLayout } from './layout/BasicLayout';
import { PageHome } from './pages/home/PageHome';
import { PageCarListing } from './pages/auto/PageCarListing';
import { PageCarListingInner } from './pages/auto/PageCarListingInner';
import { PageAbout } from './pages/about/PageAbout';
import { PageRegister } from './pages/auth/PageRegister';
import { PageLogin } from './pages/auth/PageLogin';
import { PageDashboard } from './pages/dashboard/PageDashboard';
import { PageMyAutoList } from './pages/my-auto-list/PageMyAutoList';
import { PageMyAutoCreate } from './pages/my-auto-list/PageMyAutoCreate';
import { PageMyAutoView } from './pages/my-auto-list/PageMyAutoView';
import { PageMyAutoEdit } from './pages/my-auto-list/PageMyAutoEdit';
import { PageMyAutoDelete } from './pages/my-auto-list/PageMyAutoDelete';
import { PageAccountSettings } from './pages/settings/PageAccountSettings';
import { PageNotFound } from './pages/errors/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={BasicLayout}>
          <Route index path='/' element={<PageHome />} />
          <Route path='/auto-list' element={<PageCarListing />} />
          <Route path='/auto-list/:id' element={<PageCarListingInner />} />
          <Route path='/about' element={<PageAbout />} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path='/register' element={<PageRegister />} />
          <Route path='/login' element={<PageLogin />} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path='/account' element={<PageDashboard />} />
          <Route path='/account/my-auto-list' element={<PageMyAutoList />} />
          <Route path='/account/my-auto-list/create' element={<PageMyAutoCreate />} />
          <Route path='/account/my-auto-list/view' element={<PageMyAutoView />} />
          <Route path='/account/my-auto-list/edit' element={<PageMyAutoEdit />} />
          <Route path='/account/my-auto-list/delete' element={<PageMyAutoDelete />} />
          <Route path='/account/settings' element={<PageAccountSettings />} />
        </Route>

        <Route Component={BasicLayout}>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
