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
  }

  /* ── Scrollable regions ──
     Wide tables (.table-wrap) and code blocks (pre) scroll horizontally.
     Keyboard users can only scroll them if they are focusable, so make
     overflowing ones a named, focusable region (WCAG 2.1.1). */
  function initScrollRegions() {
    var wraps = Array.prototype.slice.call(document.querySelectorAll('.table-wrap, main pre'));
    if (!wraps.length) return;

    function labelFor(wrap) {
      var caption = wrap.querySelector('caption');
      if (caption && caption.textContent.trim()) return caption.textContent.trim();
      var section = wrap.closest('section, .guide-section, article') || document.body;
      var heading = null;
      var headings = section.querySelectorAll('h1, h2, h3, h4');
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].compareDocumentPosition(wrap) & Node.DOCUMENT_POSITION_FOLLOWING) heading = headings[i];
      }
      var kind = wrap.tagName === 'PRE' ? ' code' : ' table';
      return heading ? heading.textContent.trim() + kind : 'Scrollable' + kind;
    }

    function update() {
      wraps.forEach(function (wrap) {
        var scrollable = wrap.scrollWidth > wrap.clientWidth + 1 || wrap.scrollHeight > wrap.clientHeight + 1;
        if (scrollable) {
          wrap.setAttribute('tabindex', '0');
          wrap.setAttribute('role', 'region');
          if (!wrap.hasAttribute('aria-label')) wrap.setAttribute('aria-label', labelFor(wrap));
        } else if (wrap.getAttribute('tabindex') === '0') {
          wrap.removeAttribute('tabindex');
          wrap.removeAttribute('role');
        }
      });
    }

    update();
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(update, 150);
    }, { passive: true });
  }

  function boot() {
    init();
    initScrollRegions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
