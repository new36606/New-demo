(() => {
  const FLAG_RE = /([\u{1F1E6}-\u{1F1FF}])([\u{1F1E6}-\u{1F1FF}])/gu;

  function codeFromFlag(first, second) {
    return String.fromCharCode(
      first.codePointAt(0) - 0x1f1e6 + 65,
      second.codePointAt(0) - 0x1f1e6 + 65,
    );
  }

  function makeFlag(code) {
    const wrap = document.createElement("span");
    wrap.className = "flag-wrap";

    const image = document.createElement("img");
    image.className = "flag-img";
    image.src = `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
    image.srcset = `https://flagcdn.com/48x36/${code.toLowerCase()}.png 2x`;
    image.width = 24;
    image.height = 18;
    image.alt = `${code} flag`;
    image.decoding = "async";

    const fallback = document.createElement("span");
    fallback.className = "flag-fallback";
    fallback.textContent = code;
    fallback.hidden = true;

    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
    }, { once: true });

    wrap.append(image, fallback);
    return wrap;
  }

  function upgradeTextNode(node) {
    const text = node.nodeValue;
    if (!text || !FLAG_RE.test(text)) return;
    FLAG_RE.lastIndex = 0;

    if (node.parentElement?.tagName === "OPTION") {
      node.nodeValue = text.replace(
        FLAG_RE,
        (_, first, second) => `${codeFromFlag(first, second)} ·`,
      );
      return;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const match of text.matchAll(FLAG_RE)) {
      if (match.index > lastIndex) {
        fragment.append(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      fragment.append(makeFlag(codeFromFlag(match[1], match[2])));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.append(document.createTextNode(text.slice(lastIndex)));
    }

    node.replaceWith(fragment);
  }

  function upgradeFlags(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(upgradeTextNode);
  }

  document.addEventListener("DOMContentLoaded", () => {
    upgradeFlags(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) upgradeTextNode(node);
          if (node.nodeType === Node.ELEMENT_NODE) upgradeFlags(node);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
