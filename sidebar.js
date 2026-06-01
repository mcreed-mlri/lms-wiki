(function () {
  'use strict';

  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* ignore */ });
    });

    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }

  var STORAGE_KEY = 'lace-wiki-sidebar-collapsed';

  try {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      document.documentElement.classList.add('sidebar-collapsed');
    }
  } catch (e) { /* ignore */ }

  function init() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var header = document.getElementById('sidebar-header');
    var nav = sidebar.querySelector('nav');
    var mq = window.matchMedia('(max-width: 800px)');

    if (header && nav && !document.getElementById('sidebar-search')) {
      var searchWrap = document.createElement('div');
      searchWrap.className = 'sidebar-search';

      var search = document.createElement('input');
      search.type = 'search';
      search.id = 'sidebar-search';
      search.placeholder = 'Search this page...';
      search.setAttribute('aria-label', 'Search this page');
      search.autocomplete = 'off';

      var noResults = document.createElement('div');
      noResults.className = 'sidebar-search-empty';
      noResults.textContent = 'No matches';
      noResults.hidden = true;

      searchWrap.appendChild(search);
      searchWrap.appendChild(noResults);
      header.insertAdjacentElement('afterend', searchWrap);

      var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
      var details = Array.prototype.slice.call(nav.querySelectorAll('details.nav-accordion'));
      var labels = Array.prototype.slice.call(nav.querySelectorAll('.section-label'));
      var lastMatches = [];

      function textOf(el) {
        return (el.textContent || '').toLowerCase();
      }

      function linkTarget(link) {
        var rawHref = link.getAttribute('href') || '';
        if (!rawHref || rawHref.charAt(0) === '#') return rawHref;

        try {
          var url = new URL(rawHref, window.location.href);
          if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) {
            return url.hash;
          }
        } catch (e) { /* ignore */ }

        return rawHref;
      }

      function samePageLink(link) {
        var rawHref = link.getAttribute('href') || '';
        if (rawHref.charAt(0) === '#') return true;

        try {
          var url = new URL(rawHref, window.location.href);
          return url.origin === window.location.origin && url.pathname === window.location.pathname && Boolean(url.hash);
        } catch (e) {
          return false;
        }
      }

      function linkedSection(link) {
        var target = linkTarget(link);
        if (!target || target.charAt(0) !== '#') return null;
        try {
          return document.querySelector(target);
        } catch (e) {
          return null;
        }
      }

      function searchableText(link) {
        var section = linkedSection(link);
        var sectionText = section ? textOf(section) : '';
        return [textOf(link), sectionText].join(' ');
      }

      function resultLabel(count, hasQuery) {
        if (!hasQuery) return '';
        if (count === 0) return 'No matches';
        return count === 1 ? '1 match - press Enter' : count + ' matches - press Enter';
      }

      function hasVisibleItemAfter(label) {
        var node = label.nextElementSibling;
        while (node && !node.classList.contains('section-label')) {
          if (!node.hidden) return true;
          node = node.nextElementSibling;
        }
        return false;
      }

      function filterSidebar() {
        var q = search.value.trim().toLowerCase();
        var hasQuery = q.length > 0;
        var anyVisible = false;
        var matchCount = 0;
        lastMatches = [];

        links.forEach(function (link) {
          var isSamePage = samePageLink(link);
          var match = !hasQuery || (isSamePage && searchableText(link).indexOf(q) !== -1) || (!isSamePage && textOf(link).indexOf(q) !== -1);
          link.hidden = !match;
          if (match) {
            anyVisible = true;
            if (hasQuery) {
              matchCount += 1;
              lastMatches.push(link);
            }
          }
        });

        details.forEach(function (detail) {
          var summary = detail.querySelector('summary');
          var childLinks = Array.prototype.slice.call(detail.querySelectorAll('a'));
          var summaryMatch = summary && textOf(summary).indexOf(q) !== -1;
          var childMatch = childLinks.some(function (link) { return !link.hidden; });
          var match = !hasQuery || summaryMatch || childMatch;

          detail.hidden = !match;
          if (hasQuery && match) detail.open = true;
          if (match) anyVisible = true;
        });

        labels.forEach(function (label) {
          label.hidden = hasQuery && !hasVisibleItemAfter(label);
        });

        noResults.textContent = resultLabel(matchCount, hasQuery);
        noResults.hidden = !hasQuery;
      }

      search.addEventListener('input', filterSidebar);
      search.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          search.value = '';
          filterSidebar();
          search.blur();
        }
        if (e.key === 'Enter' && lastMatches.length > 0) {
          e.preventDefault();
          lastMatches[0].click();
        }
      });
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'sidebar-toggle';
    btn.className = 'sidebar-toggle';
    btn.setAttribute('aria-controls', 'sidebar');
    document.body.appendChild(btn);

    var backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.hidden = true;
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    function isMobile() {
      return mq.matches;
    }

    function isCollapsed() {
      return document.documentElement.classList.contains('sidebar-collapsed');
    }

    function syncUi() {
      var collapsed = isCollapsed();
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
      btn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      backdrop.hidden = collapsed || !isMobile();
      backdrop.setAttribute('aria-hidden', String(backdrop.hidden));
    }

    function setCollapsed(collapsed) {
      document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
      try {
        localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
      } catch (e) { /* ignore */ }
      syncUi();
    }

    if (isMobile()) {
      document.documentElement.classList.add('sidebar-collapsed');
    }

    btn.addEventListener('click', function () {
      setCollapsed(!isCollapsed());
    });

    backdrop.addEventListener('click', function () {
      setCollapsed(true);
    });

    mq.addEventListener('change', syncUi);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMobile() && !isCollapsed()) {
        setCollapsed(true);
      }
    });

    syncUi();
    initMotion();
  }

  /* ── Reading progress, scroll-to-top, and section reveal ──
     All motion is skipped when the user prefers reduced motion. */
  function initMotion() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reading progress bar
    var progress = document.createElement('div');
    progress.id = 'reading-progress';
    document.body.appendChild(progress);

    // Scroll-to-top button
    var toTop = document.createElement('button');
    toTop.type = 'button';
    toTop.id = 'scroll-top';
    toTop.setAttribute('aria-label', 'Scroll to top');
    toTop.title = 'Back to top';
    toTop.innerHTML = '↑';
    document.body.appendChild(toTop);

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var doc = document.documentElement;
        var scrollTop = window.pageYOffset || doc.scrollTop;
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        var pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
        progress.style.width = pct + '%';
        toTop.classList.toggle('is-visible', scrollTop > 400);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // Section reveal on scroll
    var sections = Array.prototype.slice.call(document.querySelectorAll('.guide-section'));
    if (!prefersReduced && sections.length && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('reveal-ready');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
