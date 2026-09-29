import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header
  from "./components/layout/Header";

import Footer
  from "./components/layout/Footer";

import Hero
  from "./components/sections/Hero";

import SelectedWork
  from "./components/sections/SelectedWork";

import Services
  from "./components/sections/Services";

import About
  from "./components/sections/About";

import ClientMarquee
  from "./components/sections/ClientMarquee";

import FAQ
  from "./components/sections/FAQ";

import AdminRoute
  from "./components/admin/AdminRoute";

import Works
  from "./pages/Works";

import ServicesPage
  from "./pages/ServicesPage";

import AboutPage
  from "./pages/AboutPage";

import ContactPage
  from "./pages/ContactPage";

import AdminLogin
  from "./pages/admin/AdminLogin";

import AdminProjects
  from "./pages/admin/AdminProjects";

import {
  IntroProvider,
} from "./context/IntroContext";

import useLenis
  from "./hooks/useLenis";


function HomePage() {
  return (
    <>
      <Hero />

      <SelectedWork />

      <Services />

      <About />

      <FAQ />

      <ClientMarquee />
    </>
  );
}


function PublicApp() {
  useLenis();


  return (
    <div className="site">
      <Header />

      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route
            path="/works"
            element={
              <Works />
            }
          />

          <Route
            path="/services"
            element={
              <ServicesPage />
            }
          />

          <Route
            path="/about"
            element={
              <AboutPage />
            }
          />

          <Route
            path="/contact"
            element={
              <ContactPage />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


function AdminApp() {
  return (
    <div className="site site--admin">
      <main id="main-content">
        <Routes>
          <Route
            path="/admin"
            element={
              <Navigate
                to="/admin/projects"
                replace
              />
            }
          />

          <Route
            path="/admin/login"
            element={
              <AdminLogin />
            }
          />

          <Route
            path="/admin/projects"
            element={
              <AdminRoute>
                <AdminProjects />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <Navigate
                to="/admin/projects"
                replace
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}


function AppContent() {
  const location =
    useLocation();


  const isAdminRoute =
    location.pathname.startsWith(
      "/admin"
    );


  if (
    isAdminRoute
  ) {
    return (
      <AdminApp />
    );
  }


  return (
    <PublicApp />
  );
}


function App() {
  return (
    <IntroProvider>
      <AppContent />
    </IntroProvider>
  );
}


export default App;