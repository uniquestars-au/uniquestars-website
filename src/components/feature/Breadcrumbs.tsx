import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the Home page
  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { name, path };
    }),
  ];

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center justify-center gap-2 text-sm font-medium mb-8"
      style={{ fontFamily: 'Nunito, sans-serif' }}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={breadcrumb.path}>
            {index > 0 && (
              <i className="ri-arrow-right-s-line text-[#0A2A66]/30 text-lg"></i>
            )}
            
            {isLast ? (
              <span className="text-[#33C8FF] bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border-2 border-[#33C8FF]/30">
                {breadcrumb.name}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-[#0A2A66] hover:text-[#33C8FF] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/40"
              >
                {index === 0 && <i className="ri-home-4-fill"></i>}
                {breadcrumb.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
