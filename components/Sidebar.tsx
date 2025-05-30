import React, { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className = '' }) => {
  return (
    <div className={`lg:col-span-1 ${className}`}>
      <div className="lg:sticky lg:top-20 space-y-8">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;