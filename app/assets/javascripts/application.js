// Modern JavaScript for RusRails
// Bootstrap is loaded via CDN, so we can access it globally

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  initializeBootstrapComponents();

  // Initialize dark mode
  initializeDarkMode();

  // Initialize scroll to top
  initializeScrollToTop();

  // Initialize navigation
  initializeNavigation();

  // Initialize search enhancements
  initializeSearch();

  // Initialize copy code functionality
  initializeCopyCode();
});

// Bootstrap Components Initialization
function initializeBootstrapComponents() {
  // Bootstrap is loaded via CDN, components auto-initialize
  // Manual initialization for dynamic content if needed

  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (window.bootstrap && window.bootstrap.Tooltip) {
    [...tooltipTriggerList].map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
  }

  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  if (window.bootstrap && window.bootstrap.Popover) {
    [...popoverTriggerList].map(popoverTriggerEl => new window.bootstrap.Popover(popoverTriggerEl, {
      html: true,
      placement: 'bottom'
    }));
  }
}

// Dark Mode functionality
function initializeDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    // Update toggle button icon
    updateThemeToggleIcon(themeToggle, savedTheme);

    themeToggle.addEventListener('click', function() {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcon(themeToggle, newTheme);
    });
  }
}

function updateThemeToggleIcon(button, theme) {
  const icon = button.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Scroll to top functionality
function initializeScrollToTop() {
  const scrollButton = document.getElementById('scroll-to-top');

  if (!scrollButton) {
    // Create scroll to top button if it doesn't exist
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
}

// Navigation enhancements
function initializeNavigation() {
  // Handle mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
        navbarCollapse.classList.remove('show');
      }
    }
  });

  // Highlight current page in navigation
  highlightCurrentPage();
}

function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Search enhancements
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    // Add search input event listener for real-time search
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(this.value);
      }, 300);
    });

    // Add keyboard navigation for search results
    searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        clearSearchResults();
      }
    });
  }
}

function performSearch(query) {
  if (query.length < 2) {
    clearSearchResults();
    return;
  }

  // This would integrate with your search implementation
  console.log('Searching for:', query);
}

function clearSearchResults() {
  const resultsContainer = document.getElementById('search-results');
  if (resultsContainer) {
    resultsContainer.innerHTML = '';
  }
}

// Copy code functionality
function initializeCopyCode() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((codeBlock, index) => {
    const pre = codeBlock.parentElement;
    if (pre.tagName === 'PRE') {
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-btn btn btn-sm btn-outline-secondary';
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.setAttribute('data-bs-toggle', 'tooltip');
      copyButton.setAttribute('data-bs-placement', 'top');
      copyButton.setAttribute('title', 'Копировать код');

      // Position the button
      pre.style.position = 'relative';
      copyButton.style.position = 'absolute';
      copyButton.style.top = '0.5rem';
      copyButton.style.right = '0.5rem';
      copyButton.style.zIndex = '10';

      pre.appendChild(copyButton);

      // Initialize tooltip for copy button
      if (window.bootstrap && window.bootstrap.Tooltip) {
        new window.bootstrap.Tooltip(copyButton);
      }

      // Add click event
      copyButton.addEventListener('click', async function() {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);

          // Update button state
          const icon = copyButton.querySelector('i');
          const originalClass = icon.className;
          icon.className = 'fas fa-check';
          copyButton.classList.remove('btn-outline-secondary');
          copyButton.classList.add('btn-success');

          // Reset after 2 seconds
          setTimeout(() => {
            icon.className = originalClass;
            copyButton.classList.remove('btn-success');
            copyButton.classList.add('btn-outline-secondary');
          }, 2000);

        } catch (err) {
          console.error('Failed to copy code:', err);

          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = codeBlock.textContent;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      });
    }
  });
}

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Export for potential use by other scripts
window.RusRails = {
  initializeBootstrapComponents,
  initializeDarkMode,
  initializeScrollToTop,
  initializeNavigation,
  debounce
};