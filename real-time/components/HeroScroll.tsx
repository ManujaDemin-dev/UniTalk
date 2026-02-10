'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

interface HeroScrollProps {
    totalFrames: number;
}

export default function HeroScroll({ totalFrames }: HeroScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastFrameRef = useRef<number>(-1);

    const { images, loaded, progress } = useImagePreloader('/sequence-1', totalFrames);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clamp index
        const clampedIndex = Math.max(0, Math.min(index, totalFrames - 1));

        // Skip if same frame
        if (clampedIndex === lastFrameRef.current) return;
        lastFrameRef.current = clampedIndex;

        const img = images[clampedIndex];
        if (!img || !img.complete) return;

        // Responsive Object-Fit Cover Logic
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, [images, totalFrames]);

    // Listen for scroll-driven frame changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loaded) return;
        const currentFrame = Math.round(latest);
        requestAnimationFrame(() => renderFrame(currentFrame));
    });

    // Set canvas size to match viewport (with devicePixelRatio)
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Re-render current frame on resize
                lastFrameRef.current = -1; // Force re-render
                if (loaded && images.length > 0) {
                    const currentFrame = Math.round(frameIndex.get());
                    renderFrame(currentFrame);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, images, frameIndex, renderFrame]);

    // *** CRITICAL: Render first frame as soon as images are loaded ***
    useEffect(() => {
        if (loaded && images.length > 0 && canvasRef.current) {
            lastFrameRef.current = -1; // Force render
            renderFrame(0);
        }
    }, [loaded, images, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full z-0 bg-[#050505]">
            {!loaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-sm font-light tracking-widest opacity-70">INITIALIZING SEQUENCE</span>
                        <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative">
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: '-100%' }}
                                animate={{ x: `${progress - 100}%` }}
                                transition={{ ease: "linear", duration: 0.2 }}
                            />
                        </div>
                        <span className="text-xs font-mono opacity-50">{progress}%</span>
                    </div>
                </div>
            )}

            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
        </div>
    );
}
