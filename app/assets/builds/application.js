(() => {
  // app/assets/javascripts/application.js
  document.addEventListener("DOMContentLoaded", function() {
    initializeBootstrapComponents();
    initializeDarkMode();
    initializeScrollToTop();
    initializeNavigation();
    initializeSearch();
    initializeCopyCode();
  });
  function initializeBootstrapComponents() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (window.bootstrap && window.bootstrap.Tooltip) {
      [...tooltipTriggerList].map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
    }
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    if (window.bootstrap && window.bootstrap.Popover) {
      [...popoverTriggerList].map((popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl, {
        html: true,
        placement: "bottom"
      }));
    }
  }
  function initializeDarkMode() {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    if (themeToggle) {
      updateThemeToggleIcon(themeToggle, savedTheme);
      themeToggle.addEventListener("click", function() {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeToggleIcon(themeToggle, newTheme);
      });
    }
  }
  function updateThemeToggleIcon(button, theme) {
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
  function initializeScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) {
      const button = document.createElement("button");
      button.id = "scroll-to-top";
      button.className = "scroll-to-top";
      button.innerHTML = '<i class="fas fa-arrow-up"></i>';
      button.setAttribute("aria-label", "Scroll to top");
      document.body.appendChild(button);
      button.addEventListener("click", function() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
    window.addEventListener("scroll", function() {
      const scrollButton2 = document.getElementById("scroll-to-top");
      if (window.pageYOffset > 300) {
        scrollButton2.classList.add("visible");
      } else {
        scrollButton2.classList.remove("visible");
      }
    });
  }
  function initializeNavigation() {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener("click", function() {
        navbarCollapse.classList.toggle("show");
      });
    }
    document.addEventListener("click", function(event) {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
          navbarCollapse.classList.remove("show");
        }
      }
    });
    highlightCurrentPage();
  }
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }
  function initializeSearch() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener("input", function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          performSearch(this.value);
        }, 300);
      });
      searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
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
    console.log("Searching for:", query);
  }
  function clearSearchResults() {
    const resultsContainer = document.getElementById("search-results");
    if (resultsContainer) {
      resultsContainer.innerHTML = "";
    }
  }
  function initializeCopyCode() {
    const codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach((codeBlock, index) => {
      const pre = codeBlock.parentElement;
      if (pre.tagName === "PRE") {
        const copyButton = document.createElement("button");
        copyButton.className = "copy-code-btn btn btn-sm btn-outline-secondary";
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.setAttribute("aria-label", "Copy code");
        copyButton.setAttribute("data-bs-toggle", "tooltip");
        copyButton.setAttribute("data-bs-placement", "top");
        copyButton.setAttribute("title", "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u0434");
        pre.style.position = "relative";
        copyButton.style.position = "absolute";
        copyButton.style.top = "0.5rem";
        copyButton.style.right = "0.5rem";
        copyButton.style.zIndex = "10";
        pre.appendChild(copyButton);
        if (window.bootstrap && window.bootstrap.Tooltip) {
          new window.bootstrap.Tooltip(copyButton);
        }
        copyButton.addEventListener("click", async function() {
          try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            const icon = copyButton.querySelector("i");
            const originalClass = icon.className;
            icon.className = "fas fa-check";
            copyButton.classList.remove("btn-outline-secondary");
            copyButton.classList.add("btn-success");
            setTimeout(() => {
              icon.className = originalClass;
              copyButton.classList.remove("btn-success");
              copyButton.classList.add("btn-outline-secondary");
            }, 2e3);
          } catch (err) {
            console.error("Failed to copy code:", err);
            const textArea = document.createElement("textarea");
            textArea.value = codeBlock.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
          }
        });
      }
    });
  }
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate)
          func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func(...args);
    };
  }
  window.RusRails = {
    initializeBootstrapComponents,
    initializeDarkMode,
    initializeScrollToTop,
    initializeNavigation,
    debounce
  };
})();
//# sourceMappingURL=/assets/application.js.map
