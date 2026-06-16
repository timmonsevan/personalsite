import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParallaxBackground from "./components/ParallaxBackground";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import NNVisualizerPage from "./pages/NNVisualizerPage";

function App() {
  return (
    <>
      <ParallaxBackground />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/nn-visualizer" element={<NNVisualizerPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
