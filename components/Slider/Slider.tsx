"use client"
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import moment from "jalali-moment";

// Define the item type
interface CarouselItem {
  text: string;
  date: string;
}

// Define the props type
interface CarouselProps {
  items: CarouselItem[];
  onItemClick?: (index: number) => void;
}

const Carousel = ({ items, onItemClick }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 400);
  }, [isTransitioning, items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 400);
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(currentIndex);
    }
  };

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden neu-container">
      <div 
        className="relative h-full flex items-center justify-center p-8 rounded-lg cursor-pointer"
        onClick={handleItemClick}
      >
        <div 
          className="flex flex-col gap-2 items-center transition-all duration-500 ease-in-out transform"
          style={{ 
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
          }}
        >
          <Wrench className="text-fire-orange h-20 w-20" />
          <h3 className="text-2xl font-bold text-gray-700">
            {items[currentIndex].text}
          </h3>
          <span className="text-gray-400">
            {/* {items[currentIndex].date} */}
            {moment(items[currentIndex].date.slice(0, 10), "YYYY-MM-DD").locale('fa').format('YYYY/MM/DD')}
          </span>
        </div>
      </div>
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 duration-150 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 duration-150 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center w-full">
        {items.map((_, index: number) => (
          <span
            key={index}
            className={`w-[6px] h-[6px] rounded-full mx-1 transition-all duration-300 ${index === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
