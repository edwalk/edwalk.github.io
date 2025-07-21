import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { IParticlesProps } from "react-tsparticles";

export default function ParticlesBackground() {
  const particlesInit: NonNullable<IParticlesProps['init']> = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: "#dcd7ba",
          },
          links: {
            color: "#dcd7ba",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.3,
              sync: false,
            },
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            polygon: {
              sides: 5,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
} 