export const toggleBodyScroll = (isLocked: boolean, scrollToTop: boolean = false) => {
  const scrollElement = document.documentElement;

  if (isLocked) {
    // Travar o scroll
    const scrollTop =
      window.scrollY || scrollElement.scrollTop || document.body.scrollTop;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.dataset.scrollY = `${scrollTop}`;
  } else {
    // Restaurar o scroll
    const scrollTop = parseInt(document.body.dataset.scrollY || "0", 10);

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    if (scrollToTop) {
      // Scroll suave para o topo
      scrollElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Restaurar posição anterior
      window.scrollTo(0, scrollTop);
    }
  }
};

export const scrollToTop = () => {
  const scrollElement = document.documentElement;
  const start = scrollElement.scrollTop;
  const duration = 500;
  const startTime = performance.now();

  const scroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    scrollElement.scrollTop = start - easeInOutCubic * start;

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};
