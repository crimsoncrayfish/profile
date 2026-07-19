(() => {
  let currentIndex = -1;

  const THEMES = ["mocha", "macchiato", "frappe", "latte"];
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const currentTheme = () =>
    document.documentElement.dataset.theme || "mocha";

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next =
        THEMES[(THEMES.indexOf(currentTheme()) + 1) % THEMES.length];
      setTheme(next);
    });
  }

  document.querySelectorAll("article h2").forEach((h) => {
    h.tabIndex = 0;
  });

  const searchList = document.querySelector("[data-searchable]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchMirror = document.querySelector("[data-search-mirror]");
  const searchCount = document.querySelector("[data-search-count]");
  const searchEmpty = document.querySelector("[data-search-empty]");
  const searchItems = searchList
    ? Array.from(searchList.children)
    : [];

  const filterList = (query) => {
    const q = query.trim().toLowerCase();
    let visible = 0;

    searchItems.forEach((item) => {
      const match = !q || item.textContent.toLowerCase().includes(q);
      item.hidden = !match;
      if (match) visible += 1;
    });

    if (searchCount) {
      searchCount.textContent = q
        ? `${visible}/${searchItems.length}`
        : "";
    }

    if (searchEmpty) {
      searchEmpty.hidden = !(q && visible === 0);
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (searchMirror) searchMirror.textContent = searchInput.value;
      filterList(searchInput.value);
    });
  }

  const getFocusable = () =>
    Array.from(document.querySelectorAll("a[href], [tabindex='0']")).filter(
      (el) => el.offsetParent !== null,
    );

  const clearHighlight = () => {
    document
      .querySelectorAll(".kb-focus")
      .forEach((el) => el.classList.remove("kb-focus"));
  };

  const setFocus = (index) => {
    const focusable = getFocusable();
    if (focusable.length === 0) return;

    clearHighlight();
    currentIndex = ((index % focusable.length) + focusable.length) %
      focusable.length;

    const el = focusable[currentIndex];
    el.classList.add("kb-focus");
    el.focus();
    el.scrollIntoView({ block: "nearest" });
  };

  const isTypingContext = (target) =>
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (searchInput && searchInput.value) {
        searchInput.value = "";
        if (searchMirror) searchMirror.textContent = "";
        filterList("");
      }
      clearHighlight();
      currentIndex = -1;
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      return;
    }

    if (isTypingContext(e.target)) return;

    if (e.key === "/" && searchInput) {
      e.preventDefault();
      searchInput.focus();
      return;
    }

    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case "j":
        e.preventDefault();
        setFocus(currentIndex + 1);
        break;
      case "k":
        e.preventDefault();
        setFocus(currentIndex - 1);
        break;
      case "l":
      case "Enter": {
        const el = document.querySelector(".kb-focus");
        if (el instanceof HTMLAnchorElement) {
          e.preventDefault();
          el.click();
        }
        break;
      }
    }
  });

  document.addEventListener("focusin", (e) => {
    const el = e.target;
    const focusable = getFocusable();
    if (el instanceof HTMLElement && focusable.includes(el)) {
      clearHighlight();
      el.classList.add("kb-focus");
      currentIndex = focusable.indexOf(el);
    }
  });
})();
