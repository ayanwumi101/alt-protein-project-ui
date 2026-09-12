import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ContentPage } from "./pages/ContentPage";
import { Contact } from "./pages/Contact";
import { Course } from "./pages/Course";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { GalleryAdmin } from "./pages/GalleryAdmin";
import { pageData } from "./pages/pageData";
import { Research } from "./pages/Research";
import { Resources } from "./pages/Resources";
import { Team } from "./pages/Team";
import { WhoWeAre } from "./pages/WhoWeAre";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/who-we-are" element={<WhoWeAre />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/research" element={<Research />} />
          <Route path="/course" element={<Course />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/studio/gallery-upload" element={<GalleryAdmin />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          {Object.entries(pageData)
            .filter(
              ([path]) =>
                ![
                  "/about/who-we-are",
                  "/about/team",
                  "/research",
                  "/course",
                  "/contact",
                ].includes(path),
            )
            .map(([path, data]) => (
              <Route
                path={path}
                element={<ContentPage data={data} />}
                key={path}
              />
            ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
