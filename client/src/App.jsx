import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ParallaxBackground from "./components/background/ParallaxBackground";
import HomePage from "./pages/home/HomePage";
import ResumePage from "./pages/resume/ResumePage";
import NNVisualizerPage from "./pages/projects/nn_visualizer/NNVisualizerPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import MtgPage from "./pages/projects/mtg/MtgPage";

function App() {
  return (
    <>
      <ParallaxBackground />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/mtg" element={<MtgPage />} />
        <Route path="/projects/nn-visualizer" element={<NNVisualizerPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
