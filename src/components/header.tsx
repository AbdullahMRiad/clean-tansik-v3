import { useContext } from "react";
import { AppContext } from "../App";

function Header() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("ContextError: Context passed to Header is null");
    const { setIsOptionsOpen, isOptionsOpen } = ctx;

    return (
        <header className="panel flex flex-row items-center gap-2 p-3! text-center text-3xl font-bold md:text-2xl">
            <button
                className="button material-symbols-outlined aspect-square min-w-12"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                menu
            </button>
            <span>تنسيق الجامعات المصرية للشهادة السعودية</span>
        </header>
    );
}

export default Header;
