import DataSelector from "./filters/dataselect";
import FiltersSection from "./filters/filters";
import TagsSection from "./filters/tags";
import StatsSection from "./stats";
import Header from "./header";
import OptionsPanel from "./options";
import { useEffect, useState } from "react";

function ModifiersContainer() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        let observer: IntersectionObserver | null = null;

        const setupObserver = () => {
            if (!mediaQuery.matches) {
                observer?.disconnect();
                observer = null;
                setIsScrolled(false);
                return;
            }

            observer = new IntersectionObserver(
                (e) => setIsScrolled(!e[0].isIntersecting),
                { threshold: 0, root: document.getElementById("modifiers") },
            );

            const target = document.getElementById("dataselector-container");
            if (target) observer.observe(target);
        };

        setupObserver();
        mediaQuery.addEventListener("change", setupObserver);

        return () => {
            mediaQuery.removeEventListener("change", setupObserver);
            observer?.disconnect();
        };
    }, []);

    return (
        <div
            id="modifiers"
            className="scroll-container relative flex flex-col gap-2 rounded-2xl md:h-full md:max-w-sm md:overflow-y-scroll">
            <Header />
            <OptionsPanel />
            <DataSelector />
            <FiltersSection />
            <TagsSection />
            <StatsSection />
            {window.matchMedia("(min-width: 768px)").matches && (
                <button
                    className={`button material-symbols-outlined sticky bottom-2 mr-auto ml-1 aspect-square w-fit! p-2! transition-all ${isScrolled ? "translate-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    onClick={() =>
                        document
                            .getElementById("modifiers")
                            ?.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    }>
                    vertical_align_top
                </button>
            )}
        </div>
    );
}

export default ModifiersContainer;
