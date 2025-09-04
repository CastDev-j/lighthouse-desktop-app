import { ScrollControls } from "@react-three/drei";
import { Faro } from "./Faro";
import { Overlay } from "./Overlay";
// import { Overlay } from "./Overlay";

export const Experience = () => {

  return (
    <>
      <ambientLight intensity={2.5} />
      <ScrollControls  pages={4} damping={0.251}>
        <Faro />
        <Overlay />
      </ScrollControls>
    </>
  );
};
