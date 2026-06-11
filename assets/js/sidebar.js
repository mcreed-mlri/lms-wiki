(function () {
  'use strict';

  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      var manifest = document.querySelector('link[rel="manifest"]');
      var swUrl = manifest
        ? new URL('sw.js', new URL('.', manifest.href)).href
        : new URL('sw.js', window.location.href).href;
      navigator.serviceWorker.register(swUrl).catch(function () { /* ignore */ });
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

      var searchStatus = document.createElement('div');
      searchStatus.className = 'sidebar-search-empty';
      searchStatus.textContent = 'Type to find on this page';
      searchStatus.hidden = true;

      searchWrap.appendChild(search);
      searchWrap.appendChild(searchStatus);
      header.insertAdjacentElement('afterend', searchWrap);

      var pageMatches = [];
      var activeMatchIndex = -1;

      function clearPageMatches() {
        pageMatches.forEach(function (mark) {
          var parent = mark.parentNode;
          if (!parent) return;
          parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
          parent.normalize();
        });
        pageMatches = [];
        activeMatchIndex = -1;
      }

      function acceptsTextNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return false;
        var parent = node.parentElement;
        if (!parent) return false;
        return !parent.closest('#sidebar, script, style, noscript, input, textarea, select, button, .page-search-mark');
      }

      function markTextNode(node, query) {
        var text = node.nodeValue;
        var lower = text.toLowerCase();
        var q = query.toLowerCase();
        var index = lower.indexOf(q);
        if (index === -1) return;

        var fragment = document.createDocumentFragment();
        var cursor = 0;

        while (index !== -1) {
          if (index > cursor) {
            fragment.appendChild(document.createTextNode(text.slice(cursor, index)));
          }

          var mark = document.createElement('mark');
          mark.className = 'page-search-mark';
          mark.textContent = text.slice(index, index + query.length);
          fragment.appendChild(mark);
          pageMatches.push(mark);

          cursor = index + query.length;
          index = lower.indexOf(q, cursor);
        }

        if (cursor < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(cursor)));
        }

        node.parentNode.replaceChild(fragment, node);
      }

      function updateSearchStatus() {
        var hasQuery = search.value.trim().length > 0;
        if (!hasQuery) {
          searchStatus.hidden = true;
          searchStatus.textContent = '';
          return;
        }

        searchStatus.hidden = false;
        if (!pageMatches.length) {
          searchStatus.textContent = 'No matches';
        } else {
          searchStatus.textContent = (activeMatchIndex + 1) + ' of ' + pageMatches.length + ' - Enter next';
        }
      }

      function activateMatch(index) {
        if (!pageMatches.length) {
          activeMatchIndex = -1;
          updateSearchStatus();
          return;
        }

        if (activeMatchIndex >= 0 && pageMatches[activeMatchIndex]) {
          pageMatches[activeMatchIndex].classList.remove('is-active');
        }

        activeMatchIndex = (index + pageMatches.length) % pageMatches.length;
        var active = pageMatches[activeMatchIndex];
        active.classList.add('is-active');
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
        updateSearchStatus();
      }

      function findOnPage() {
        var q = search.value.trim();
        clearPageMatches();

        if (!q) {
          updateSearchStatus();
          return;
        }

        var main = document.getElementById('main') || document.body;
        var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
          acceptNode: function (node) {
            return acceptsTextNode(node) && node.nodeValue.toLowerCase().indexOf(q.toLowerCase()) !== -1
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          }
        });
        var nodes = [];
        var node = walker.nextNode();

        while (node) {
          nodes.push(node);
          node = walker.nextNode();
        }

        nodes.forEach(function (textNode) {
          markTextNode(textNode, q);
        });

        if (pageMatches.length) {
          activateMatch(0);
        } else {
          updateSearchStatus();
        }
      }

      function clearSearch() {
        search.value = '';
        clearPageMatches();
        updateSearchStatus();
      }

      search.addEventListener('input', findOnPage);
      search.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          clearSearch();
          search.blur();
        }
        if (e.key === 'Enter' && pageMatches.length > 0) {
          e.preventDefault();
          activateMatch(activeMatchIndex + (e.shiftKey ? -1 : 1));
        }
      });

      document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
          e.preventDefault();
          if (isCollapsed()) setCollapsed(false);
          search.focus();
          search.select();
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
