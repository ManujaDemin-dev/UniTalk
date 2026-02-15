'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { COPY_DECK } from '@/lib/constants';

interface HeroScrollProps {
    totalFrames: number;
}

export default function HeroScroll({ totalFrames }: HeroScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastFrameRef = useRef<number>(-1);

    // Asset Loading Logic
    const { images, loaded, progress } = useImagePreloader('/sequence-1', totalFrames);

    // Scroll Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Text Opacity/Position Transforms
    const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [40, 0, 0, -40]);

    const section2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [60, 0, 0, -60]);

    // Canvas Rendering Logic
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const clampedIndex = Math.max(0, Math.min(Math.round(index), totalFrames - 1));
        if (clampedIndex === lastFrameRef.current) return;
        lastFrameRef.current = clampedIndex;

        const img = images[clampedIndex];
        if (!img || !img.complete) return;

        // Cover resize logic
        const { width: canvasWidth, height: canvasHeight } = canvas;
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

    // Update canvas on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loaded) return;
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle Resize & HiDPI Screens
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                lastFrameRef.current = -1; 
                if (loaded) renderFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [loaded, frameIndex, renderFrame]);

    // Initial Render
    useEffect(() => {
        if (loaded && images.length > 0) renderFrame(0);
    }, [loaded, images, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full z-0 bg-black">
            
            {/* --- CUSTOM LOADING PAGE --- */}
            <AnimatePresence>
                {!loaded && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white font-sans"
                    >
                        <div className="relative flex flex-col items-center w-full max-w-md px-10">
                            
                            {/* Bold Percentage */}
                            <motion.span 
                                className="text-7xl md:text-8xl font-bold tracking-tighter mb-4"
                            >
                                {progress}<span className="text-4xl md:text-5xl ml-1 font-light opacity-60">%</span>
                            </motion.span>

                            {/* Minimalist Progress Bar */}
                            <div className="w-full h-[1px] bg-white/10 relative mb-6">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                >
                                    {/* The Glow Point */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white blur-sm rounded-full" />
                                </motion.div>
                            </div>

                            {/* UI Labels */}
                            <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
                                <span className="opacity-40">Loading status</span>
                                <span className="text-white italic">geometry _</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO CONTENT --- */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />

                {/* Hero Title Overlay */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10"
                >
                    <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase">
                        {COPY_DECK.hero.headline}
                    </h1>
                    <p className="mt-4 text-sm md:text-lg font-light tracking-[0.3em] uppercase opacity-70">
                        {COPY_DECK.hero.subHeadline}
                    </p>
                </motion.div>

                {/* Section 2 Overlay */}
                <motion.div
                    style={{ opacity: section2Opacity, y: section2Y }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10 px-6"
                >
                    <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-center">
                        {COPY_DECK.section2.header}
                    </h2>
                    <p className="mt-6 max-w-xl text-center text-sm md:text-lg opacity-70 font-light">
                        {COPY_DECK.section2.body}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}