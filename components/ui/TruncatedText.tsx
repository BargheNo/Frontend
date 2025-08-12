import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TruncatedTextProps {
  maxLength?: number;
  className?: string;
  children: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  maxLength = 70,
  className = '',
  children
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className={className}>
      <div className={`transition-all duration-200 ${isExpanded ? 'opacity-100 max-h-48 mb-8' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <span className="mr-1">{children}</span>
      </div>
      {!isExpanded && (
        <div className="text-gray-600">
          <span className="mr-1">{truncateText(children, maxLength)}</span>
        </div>
      )}
      {children.length > maxLength && (
        <div
          className="flex items-center text-gray-400 mt-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}>
          <span className="font-medium">بیشتر</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      )}
    </div>
  );
};

export default TruncatedText;