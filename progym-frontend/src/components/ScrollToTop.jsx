import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [pathname]); // Trigger on route change

  return null; // This component doesn't render anything
}

export default ScrollToTop;
