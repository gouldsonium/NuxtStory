// plugins/router.scrollBehavior.js
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.$router.options.scrollBehavior = async (to, from, savedPosition) => {
    console.log('scrollBehavior called', { to, from, savedPosition });

    // If there's a saved scroll position, return it.
    if (savedPosition) {
      console.log('Returning saved position:', savedPosition);
      return savedPosition;
    }

    // Handle hash-based scrolling.
    if (to.hash) {
      // Wait for the next tick to ensure the element is in the DOM.
      await new Promise(resolve => setTimeout(resolve, 0));

      // Check if the element with the hash exists.
      const element = document.querySelector(to.hash);
      if (element) {
        console.log('Element found for hash:', to.hash);
        return {
          el: to.hash,
          behavior: 'smooth'
        };
      } else {
        console.log('Element not found for hash:', to.hash);
        // Fall through to scroll to top if the element is not found
      }
    }

    // Default to top of the page.
    console.log('Scrolling to top of the page');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Scrolling to top after delay');
        resolve({ top: 0, behavior: 'smooth'});
      }, 500);
    });
  };
});
