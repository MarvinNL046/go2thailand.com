import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText = ({ text, speed = 50, className = '', showCursor = true }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isTyping, setIsTyping] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {hasMounted && showCursor && (
        <span className={`inline-block w-0.5 h-6 bg-current ml-1 ${isTyping ? 'animate-blink' : 'opacity-0'}`} />
      )}
    </span>
  );
};

export default TypewriterText;