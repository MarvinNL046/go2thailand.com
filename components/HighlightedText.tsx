import { useEffect, useRef, useState } from 'react';

interface HighlightedTextProps {
  text: string;
  highlightWords: string[];
  highlightClassName?: string;
  animationType?: 'fade' | 'slide' | 'glow' | 'underline';
  delay?: number;
}

const HighlightedText = ({ 
  text, 
  highlightWords, 
  highlightClassName = 'text-thailand-red font-bold',
  animationType = 'fade',
  delay = 0
}: HighlightedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animationType) {
      case 'fade':
        return 'animate-fadeIn';
      case 'slide':
        return 'animate-slideInUp';
      case 'glow':
        return 'animate-pulse';
      case 'underline':
        return 'relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-thailand-red after:animate-expandWidth';
      default:
        return '';
    }
  };

  const renderText = () => {
    let result = text;
    
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, `<span class="${highlightClassName} ${getAnimationClass()}">$1</span>`);
    });

    return <span ref={ref} dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return renderText();
};

export default HighlightedText;