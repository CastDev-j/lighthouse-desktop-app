import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useState, type JSX } from "react";
import { cn } from "../shared/utils";

// Icons
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import {
  SiAstro,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiGit,
  SiReact,
  SiSocketdotio,
  SiThreedotjs,
} from "react-icons/si";
import { usePage } from "../store/usePage";

// ---------------------- Section Component ----------------------
interface SectionProps {
  children: React.ReactNode;
  right?: boolean;
  opacity?: number;
}

const Section = ({ children, right, opacity = 1 }: SectionProps) => {
  const [contentOpacity, setContentOpacity] = useState(1);

  const handleOpacityChange = (value: number) => {
    setContentOpacity(value);
  };

  return (
    <section
      className={cn(
        "h-screen w-screen max-w-6xl flex flex-col justify-center p-10",
        right ? "items-start" : "items-end"
      )}
      style={{ opacity: opacity }}
    >
      <div className="bg-neutral-50 p-2 rounded-full mb-2 border-2 border-neutral-200">
        {contentOpacity > 0.5 ? (
          <FaEye
            className="text-2xl cursor-pointer"
            onClick={() => handleOpacityChange(0)}
          />
        ) : (
          <FaEyeSlash
            className="text-2xl cursor-pointer opacity-50"
            onClick={() => handleOpacityChange(1)}
          />
        )}
      </div>
      <div className="max-w-md w-full" style={{ opacity: contentOpacity }}>
        <div className="bg-neutral-50 border border-neutral-200 shadow-md rounded-2xl px-6 py-8">
          {children}
        </div>
      </div>
    </section>
  );
};

// ---------------------- Tag Component ----------------------
const techIcons: Record<string, JSX.Element> = {
  Astro: <SiAstro className="text-xl" />,
  "Next.js": <SiNextdotjs className="text-xl" />,
  JavaScript: <SiJavascript className="text-yellow-400 text-xl" />,
  TypeScript: <SiTypescript className="text-neutral-600 text-xl" />,
  Tailwind: <SiTailwindcss className="text-cyan-500 text-xl" />,
  HTML: <SiHtml5 className="text-orange-500 text-xl" />,
  CSS: <SiCss3 className="text-neutral-900 text-xl" />,
  Git: <SiGit className="text-red-500 text-xl" />,
  GitHub: <FaGithub className="text-gray-800 text-xl" />,
  React: <SiReact className="text-cyan-400 text-xl" />,
  "Socket.io": <SiSocketdotio className="text-gray-600 text-xl" />,
  "Three.js": <SiThreedotjs className="text-black text-xl" />,
  r3f: <SiThreedotjs className="text-purple-500 text-xl" />,
  GSAP: <span className="font-bold text-sm">GSAP</span>,
};

const Tag = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full shadow-sm text-sm font-medium text-neutral-700">
      {techIcons[label] ?? null}
      {label}
    </div>
  );
};

// ---------------------- ContactItem Component ----------------------
const ContactItem = ({
  label,
  value,
  link,
  icon,
}: {
  label: string;
  value: string;
  link: string;
  icon: JSX.Element;
}) => (
  <a
    href={link}
    target="_blank"
    className="flex items-center gap-3 px-4 py-2 bg-neutral-100 border border-neutral-300 rounded-md hover:bg-neutral-200 transition"
  >
    {icon}
    <div className="text-sm text-neutral-700">
      <span className="font-medium">{label}:</span> {value}
    </div>
  </a>
);

// ---------------------- Overlay ----------------------
export const Overlay = () => {
  const scroll = useScroll();
  const page = usePage((state) => state.page);
  const setPage = usePage((state) => state.setPage);

  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityThirdSection, setOpacityThirdSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 0.25));
    setOpacitySecondSection(scroll.curve(0.2, 0.25));
    setOpacityThirdSection(scroll.curve(0.55, 0.25));
  });

  const setOffset = useCallback(
    (page: number) => {
      scroll.el.scrollTo({
        top: 0.2675 * page * scroll.el.scrollHeight,
        behavior: "smooth",
      });
    },
    [scroll]
  );

  useEffect(() => {
    setOffset(page);
  }, [page, setOffset]);

  const handleSectionChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Scroll html>
      <div className="w-screen h-fit flex flex-col items-center">
        {/* ---------------------- Section 1 ---------------------- */}
        <Section right opacity={opacityFirstSection}>
          <h2 className="font-serif text-2xl text-neutral-800 mb-4">
            Experiencia y Certificaciones
          </h2>

          <div className="text-base text-neutral-900 mb-1">
            Ene 2022 - Actualidad
          </div>
          <div className="font-semibold text-neutral-700 mb-1">
            Estudiante de Desarrollo Web
          </div>
          <p className="text-sm text-neutral-600 mb-3">
            Aprendiendo y aplicando tecnologías web modernas para crear
            aplicaciones interactivas y eficientes.
          </p>

          <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
            <li>
              <span className="font-medium">Desarrollo web:</span> HTML, CSS,
              TypeScript, Tailwind CSS, Three.js, r3f y Git.
            </li>
            <li>
              <span className="font-medium">Aprendizaje continuo:</span> Busco
              retos que expandan mi conocimiento técnico.
            </li>
            <li>
              <span className="font-medium">Proyectos personales:</span>{" "}
              Aplicaciones y colaboración en código abierto.
            </li>
          </ul>

          <div className="flex gap-2 mt-4 justify-end">
            <button
              onClick={() => handleSectionChange(1)}
              className="px-4 py-2 border border-neutral-900 text-neutral-50 bg-neutral-900 rounded-md transition hover:bg-neutral-50 hover:text-neutral-950"
            >
              Siguiente
            </button>
          </div>
        </Section>

        {/* ---------------------- Section 2 ---------------------- */}
        <Section opacity={opacitySecondSection}>
          <h2 className="font-serif text-2xl text-neutral-800 mb-4">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Astro",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Tailwind",
              "HTML",
              "CSS",
              "Git",
              "GitHub",
              "React",
              "Socket.io",
              "Three.js",
              "r3f",
              "GSAP",
            ].map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>

          <div className="flex gap-2 mt-4 justify-between">
            <button
              onClick={() => handleSectionChange(0)}
              className="px-4 py-2 border border-neutral-900 text-neutral-900 rounded-md transition hover:bg-neutral-50"
            >
              Anterior
            </button>
            <button
              onClick={() => handleSectionChange(2)}
              className="px-4 py-2 border border-neutral-900 text-neutral-50 bg-neutral-900 rounded-md transition hover:bg-neutral-50 hover:text-neutral-950"
            >
              Siguiente
            </button>
          </div>
        </Section>

        {/* ---------------------- Section 3 ---------------------- */}
        <Section right opacity={opacityThirdSection}>
          <h2 className="font-serif text-2xl text-neutral-800 mb-4">
            Contacto
          </h2>

          <div className="text-sm space-y-2">
            <ContactItem
              label="Email"
              value="andres2004_cj@outlook.com"
              link="mailto:andres2004_cj@outlook.com"
              icon={<FaEnvelope className="text-neutral-700 text-lg" />}
            />
            <ContactItem
              label="GitHub"
              value="CastDev-j"
              link="https://github.com/CastDev-j"
              icon={<FaGithub className="text-neutral-700 text-lg" />}
            />
            <ContactItem
              label="LinkedIn"
              value="andres-castillo"
              link="https://www.linkedin.com/in/andres-castillo-jimenez-249210292/"
              icon={<FaLinkedin className="text-neutral-700 text-lg" />}
            />
          </div>

          <div className="flex gap-2 mt-4 justify-between">
            <button
              onClick={() => handleSectionChange(1)}
              className="px-4 py-2 border border-neutral-900 text-neutral-900 rounded-md transition hover:bg-neutral-50"
            >
              Anterior
            </button>
            <button
              onClick={() => handleSectionChange(3)}
              className="px-4 py-2 border border-neutral-900 text-neutral-50 bg-neutral-900 rounded-md transition hover:bg-neutral-50 hover:text-neutral-950"
            >
              Ver Modelo
            </button>
          </div>
        </Section>
      </div>
    </Scroll>
  );
};
