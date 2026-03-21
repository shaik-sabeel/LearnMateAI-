import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        
        // Follow mouse
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power3.out'
            });
        };

        // Magnetic effect for elements with .magnet-target
        const magnets = document.querySelectorAll('.magnet-target');
        
        const attachMagnet = (e) => {
            const magnet = e.currentTarget;
            const bounding = magnet.getBoundingClientRect();
            const x = e.clientX - bounding.left - bounding.width / 2;
            const y = e.clientY - bounding.top - bounding.height / 2;
            
            gsap.to(magnet, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Expand cursor slightly
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(147, 51, 234, 0.2)', // primary color
                duration: 0.2
            });
        };

        const detachMagnet = (e) => {
            const magnet = e.currentTarget;
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });

            // Reset cursor
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.2
            });
        };

        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', attachMagnet);
            magnet.addEventListener('mouseleave', detachMagnet);
        });

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            magnets.forEach(magnet => {
                magnet.removeEventListener('mousemove', attachMagnet);
                magnet.removeEventListener('mouseleave', detachMagnet);
            });
        };
    }, []);

    return (
        <div 
            ref={cursorRef} 
            className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
        />
    );
}
