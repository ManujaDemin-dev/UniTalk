import { useState, useEffect, useRef } from 'react';

export const useImagePreloader = (path: string, totalFrames: number) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const hasStartedLoading = useRef(false);

    useEffect(() => {
        // Guard against React StrictMode double-invoke
        if (hasStartedLoading.current) return;
        hasStartedLoading.current = true;

        const loadedImages: HTMLImageElement[] = new Array(totalFrames);
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, '0');
            img.src = `${path}/ezgif-frame-${frameIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setImages([...loadedImages]);
                    setLoaded(true);
                }
            };

            img.onerror = () => {
                // Still count errored images to avoid hanging
                loadedCount++;
                setProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setImages([...loadedImages]);
                    setLoaded(true);
                }
            };

            loadedImages[i - 1] = img;
        }
    }, [path, totalFrames]);

    return { images, loaded, progress };
};
