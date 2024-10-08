import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LandSlideModule = buildModule("LandslideModule",  (m) => {
  const landSlide = m.contract("Landslide");
  
  return { landSlide }
  
})

export default LandSlideModule;