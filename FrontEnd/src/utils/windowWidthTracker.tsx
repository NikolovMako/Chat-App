import { useEffect } from "react";

export const windowWidthTracker = (setWindowWidth: (event: number) => void) => {
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
}
