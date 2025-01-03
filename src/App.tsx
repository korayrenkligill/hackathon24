import Full from "./layouts/Full";
import Main from "./layouts/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import { ThemeProvider } from "./components/ThemeContext";
import Error404 from "./pages/error/Error404";
import LoginPage from "./pages/registeration/LoginPage";
import RegisterPage from "./pages/registeration/RegisterPage";
import MailActivation from "./pages/registeration/MailActivation";
import ScrollToTop from "./components/ScrollToTop";
import GuestProtectedRoutes from "./layouts/Protecteds/GuestProtectedRoutes";
import AuthProtectedRoutes from "./layouts/Protecteds/AuthProtectedRoutes";
import { authAtom, AuthProvider } from "./components/AuthContext";
import EventListPage from "./pages/events/EventListPage";
import ForumPage from "./pages/forum/ForumPage";
import EventMap from "./pages/events/EventMap";
import AwardsPage from "./pages/awards/AwardsPage";
import { ToastContainer } from "react-toastify";
import { Provider, useSetAtom } from "jotai";
import { myStore } from "./store/User";
import EventCreate from "./pages/events/EventCreate";
import ForumDetail from "./components/Forum/ForumDetail";
import Profile from "./pages/profile/Profile";
import { IntlProvider } from "react-intl";
import { useEffect } from "react";
import tr from "./store/tr.json";
import en from "./store/en.json";
import az from "./store/az.json";
function App() {
  const language = JSON.parse(
    localStorage.getItem("lang") == "tr"
      ? JSON.stringify(tr)
      : localStorage.getItem("lang") == "en"
      ? JSON.stringify(en)
      : JSON.stringify(az) || "{}"
  );
  const lang = localStorage.getItem("lang") || "tr";

  return (
    <ThemeProvider>
      <div className="App">
        {/* 
// @ts-ignore */}
        <BrowserRouter>
          <Provider store={myStore}>
            <AuthProvider>
              <ScrollToTop />
              <Routes>
                <Route element={<Main />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/etkinlik-listesi" element={<EventListPage />} />
                  <Route path="/etkinlik-haritası" element={<EventMap />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/forum/:id" element={<ForumDetail />} />
                  <Route path="/oduller" element={<AwardsPage />} />
                  <Route path="/profil" element={<Profile />} />
                  {/* Buraya GİRİŞ YAPMIŞ kullanıcılar giremez */}
                  <Route element={<GuestProtectedRoutes />}>
                    <Route path="/giris-yap" element={<LoginPage />} />
                    <Route path="/kayit-ol" element={<RegisterPage />} />
                    <Route path="/mail-onay" element={<MailActivation />} />
                  </Route>
                  {/* Buraya GİRİŞ YAPMAMIŞ kullanıcılar giremez */}
                  <Route element={<AuthProtectedRoutes />}>
                    <Route path="/etkinlik-olustur" element={<EventCreate />} />
                    {/* <Route path="/profil" element={<ProfilePage />} /> */}
                    {/* <Route path="/hesap" element={<AccountPage />} /> */}
                  </Route>
                </Route>
                <Route element={<Full />} />
                <Route element={<Main />}>
                  <Route path="*" element={<Error404 />} />
                </Route>
              </Routes>
            </AuthProvider>
          </Provider>
        </BrowserRouter>
        <ToastContainer />
        {/* tslint:enable */}
      </div>
    </ThemeProvider>
  );
}

export default App;
