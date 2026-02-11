'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { COPY_DECK } from '@/lib/constants';

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

    // --- Title opacity transforms driven by scroll ---
    // Hero title: visible from 0% to ~25%, fades out by 35%
    const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.35], [40, 0, 0, -40]);

    // Section 2 text: fades in at 45%, visible until 70%, fades out by 85%
    const section2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [60, 0, 0, -60]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const clampedIndex = Math.max(0, Math.min(index, totalFrames - 1));

        if (clampedIndex === lastFrameRef.current) return;
        lastFrameRef.current = clampedIndex;

        const img = images[clampedIndex];
        if (!img || !img.complete) return;

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

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loaded) return;
        const currentFrame = Math.round(latest);
        requestAnimationFrame(() => renderFrame(currentFrame));
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                lastFrameRef.current = -1;
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

    useEffect(() => {
        if (loaded && images.length > 0 && canvasRef.current) {
            lastFrameRef.current = -1;
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

                {/* Hero Title Overlay */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10"
                >
                    <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
                        {COPY_DECK.hero.headline}
                    </h1>
                    <p className="mt-4 text-sm md:text-lg font-light tracking-[0.3em] uppercase opacity-70">
                        {COPY_DECK.hero.subHeadline}
                    </p>
                </motion.div>

                {/* Section 2 Text Overlay */}
                <motion.div
                    style={{ opacity: section2Opacity, y: section2Y }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10 px-6"
                >
                    <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-center drop-shadow-2xl">
                        {COPY_DECK.section2.header}
                    </h2>
                    <p className="mt-6 max-w-xl text-center text-sm md:text-base font-light leading-relaxed opacity-70">
                        {COPY_DECK.section2.body}
                    </p>
                    <span className="mt-8 text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase opacity-50">
                        {COPY_DECK.section2.cta}
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
