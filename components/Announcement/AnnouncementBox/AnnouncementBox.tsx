"use client"
import { cn } from "@/lib/utils";
import {useRef, useEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function AnnouncementBox({children, className}: {children: React.ReactNode, className?: string}) {
    const holder = useRef<HTMLDivElement>(null);
    const scrollTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        const panels = gsap.utils.toArray('.panel');
        
        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                scroller: holder.current,
                trigger: panel as Element,
                start: 'top 0px',
                end: 'bottom 0px',
                scrub: true,
                // pin: true,
                // snap: 1,
                onEnter: (self) =>
                {
                    console.log("Enter:", i)
                    self.isActive && !scrollTween.current && goToSection_down(i)
                },
                onEnterBack: (self) =>
                {
                    console.log("Enter Back:", i)
                    self.isActive && !scrollTween.current && goToSection_up(i)
                },
                // onLeave: (self) =>
                // {
                //     console.log("Leave:", i)
                //     // self.isActive && !scrollTween.current && goToSection(i)
                // },
                // onLeaveBack: (self) =>
                // {
                //     console.log("Leave Back:", i)
                //     // self.isActive && !scrollTween.current && goToSection(i)
                // },
                // onToggle: (self) =>
                // {
                //     console.log("Toggle:", i)
                // },
                id: 'panel-' + i,
                markers: true,
            });
        });

        ScrollTrigger.create({
            start: 0,
            end: 'max',
            snap: 1 / (panels.length - 1),
            markers: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const goToSection_down = (i: number) => {
        const target = (document.querySelector('#panel-' + (i+2)) as HTMLElement)?.offsetTop-window.innerHeight/20;
        if (target) {
            scrollTween.current = gsap.to(holder.current, {
                scrollTo: target,
                duration: 1.5,
                ease: 'power2.inOut',
                id: 'scrollTween',
                onComplete: () => (scrollTween.current = null),
                overwrite: true,
            });
        }
    };

    const goToSection_up = (i: number) => {
        const target = (document.querySelector('#panel-' + (i+1)) as HTMLElement)?.offsetTop-window.innerHeight/20;
        if (target) {
            scrollTween.current = gsap.to(holder.current, {
                scrollTo: target,
                duration: 1.5,
                ease: 'power2.inOut',
                id: 'scrollTween',
                onComplete: () => (scrollTween.current = null),
                overwrite: true,
            });
        }
    };
    
    return (
        <div className={cn("neo-card p-5 rounded-lg", className)}>
            <div ref={holder} className="neo-card-rev rounded-lg p-10 h-full overflow-y-scroll scroll-smooth no-scrollbar flex flex-col justify-between items-center gap-[10vh]">
                {children}
                {/* <div className="w-full h-6" /> */}
            </div>
        </div>
    );
}
