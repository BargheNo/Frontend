import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useChatScroll = (
  messageReloaderRef: React.RefObject<HTMLDivElement | null>,
  thirdMessage: React.RefObject<any>,
  getNewPage: (page: number) => void,
  currentPage: number
) => {
  const rollerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const loaders = gsap.utils.toArray(".reload-spiner");
    let messageReloader = null;
    
    if(messageReloaderRef.current){
      messageReloader = ScrollTrigger.create({
        trigger: messageReloaderRef.current,
        scroller: "#chat-box",
        start: "center top",
        end: "bottom bottom",
        pin: true,
        id: "messageReloader",
        onEnterBack: () => {
          if (messageReloaderRef.current) {
            gsap.to(messageReloaderRef.current, {
              opacity: 1,
              height: "40px",
              duration: 0.7,
              ease: "power1.out",
            });
            gsap.to(messageReloaderRef.current, {
              opacity: 0,
              height: "0px",
              duration: 0.7,
              ease: "power1.out",
              delay: 0.7,
            });
            if (loaders.length !== 0) {
              gsap.set(loaders, { rotation: 0 });
              gsap.to(loaders, {
                rotate: 360,
                duration: 0.2,
                repeat: 7,
                ease: "power1.out",
              });
            }
          }
        },
      });
    }

    return () => {
      if (messageReloader) {
        messageReloader.kill();
      }
    };
  }, [messageReloaderRef.current]);

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (!chatBox || !rollerRef.current) return;

    let lastScrollTop = chatBox.scrollTop;
    let rotationDegree = 0;

    const handleScroll = () => {
      const currentScroll = chatBox.scrollTop;
      const scrollDiff = currentScroll - lastScrollTop;
      rotationDegree += scrollDiff;

      gsap.to(rollerRef.current, {
        rotation: rotationDegree,
        duration: 0.3,
        ease: "power1.out",
      });

      lastScrollTop = currentScroll;
    };

    chatBox.addEventListener("scroll", handleScroll);

    let thirdMessageTrigger = null;
    if(thirdMessage.current){
      thirdMessageTrigger = ScrollTrigger.create({
        trigger: thirdMessage.current,
        start: "top top",
        end: "start start",
        scroller: "#chat-box",
        onLeaveBack: () => {
          getNewPage(currentPage + 1);
        },
      });
    }

    return () => {
      chatBox.removeEventListener("scroll", handleScroll);
      if(thirdMessageTrigger) {
        thirdMessageTrigger.kill();
      }
    };
  }, [thirdMessage.current, currentPage, getNewPage]);

  return { rollerRef };
}; 