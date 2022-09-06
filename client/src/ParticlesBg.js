import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import particlesConfig from "./particles/particlesConfig";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles id="tsparticles" options={particlesConfig} init={particlesInit} loaded={particlesLoaded} />
  );
}; 

export default ParticlesBg; 
