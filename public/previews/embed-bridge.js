(() => {
  let pending = 0;
  const send = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => {
      const content = document.querySelector('main') || document.getElementById('cache-lesson') || document.body;
      const box = content.getBoundingClientRect();
      const bottomMargin = parseFloat(getComputedStyle(document.body).marginBottom) || 0;
      const height = box.bottom + window.scrollY + bottomMargin + 8;
      window.parent.postMessage({ type: 'anatomy:resize', height }, window.location.origin);
    });
  };
  new ResizeObserver(send).observe(document.body);
  window.addEventListener('load', send);
  window.addEventListener('resize', send);
  window.addEventListener('message', event => {
    if (event.origin === window.location.origin && event.source === window.parent && event.data?.type === 'anatomy:measure') send();
  });
  document.fonts?.ready.then(send);
  send();
})();
