export const initLazyLoading = () => {
  const images = document.querySelectorAll('img[src]');
  
  const imageOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Set src to data-src
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
        }
        observer.unobserve(img);
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(handleIntersection, imageOptions);

  // Convert all images to lazy load
  images.forEach(img => {
    // Skip if already processed
    if (img.classList.contains('loaded')) return;

    // Store original src
    const src = img.src;
    img.dataset.src = src;
    
    // Set placeholder
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    
    // Add loading class
    img.classList.add('lazy');
    
    // Start observing
    observer.observe(img);
  });
};