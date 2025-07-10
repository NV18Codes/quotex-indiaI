import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicFavicon = () => {
  const location = useLocation();

  useEffect(() => {
    const updateFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        link.href = '/favicon.svg';
      }
    };

    updateFavicon();
  }, [location.pathname]);

  return null;
};

export default DynamicFavicon; 