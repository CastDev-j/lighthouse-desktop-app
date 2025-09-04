import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePage } from "../store/usePage";
import { cn } from "../shared/utils";

gsap.registerPlugin(useGSAP);

export const Menu = () => {
  const page = usePage((state) => state.page);
  const setPage = usePage((state) => state.setPage);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!menuRef.current) return;

    // Estado inicial oculto
    gsap.set(menuRef.current, { x: "-100%", autoAlpha: 0, display: "none" });
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(
        el,
        { display: "none", x: "-100%", autoAlpha: 0 },
        {
          display: "block",
          x: "0%",
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(el, {
        x: "-100%",
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(el, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  const handleMenuClick = (page: number) => {
    setIsOpen(false);
    setPage(page);
  };

  return (
    <>
      {/* Botón de abrir/cerrar */}
      <button
        className="fixed top-4 left-4 z-40 bg-white text-gray-800 shadow-md p-3 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Menú animado con GSAP */}
      <div ref={menuRef} className="fixed inset-0 z-1 bg-white text-gray-800">
        <div className="flex flex-col w-full h-screen text-2xl items-center justify-center gap-12">
          <button
            onClick={() => handleMenuClick(0)}
            className={cn(
              "hover:scale-105 hover:text-black transition-all duration-200",
              page === 0 ? "font-semibold" : "text-gray-500"
            )}
          >
            Acerca de mí
          </button>
          <button
            onClick={() => handleMenuClick(1)}
            className={cn(
              "hover:scale-105 hover:text-black transition-all duration-200",
              page === 1 ? "font-semibold" : "text-gray-500"
            )}
          >
            Stack Tecnológico
          </button>
          <button
            onClick={() => handleMenuClick(2)}
            className={cn(
              "hover:scale-105 hover:text-black transition-all duration-200",
              page === 2 ? "font-semibold" : "text-gray-500"
            )}
          >
            Contacto
          </button>
          <button
            onClick={() => handleMenuClick(3)}
            className={cn(
              "hover:scale-105 hover:text-black transition-all duration-200",
              page === 3 ? "font-semibold" : "text-gray-500"
            )}
          >
            Modelo
          </button>
        </div>
      </div>
    </>
  );
};
