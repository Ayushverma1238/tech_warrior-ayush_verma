import { useEffect } from "react";

function DisableNumberScroll() {
    useEffect(() => {
        const handleWheel = (e) => {
            if (document.activeElement?.type === "number") {
                e.preventDefault();
            }
        };

        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return null;
}

export default DisableNumberScroll;