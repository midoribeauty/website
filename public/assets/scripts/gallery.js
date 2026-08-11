// Gallery interactions — Midori Beauty
// Extracted during Refactor Phase 3.
// Handles gallery carousel, paginated thumbnails, lightbox, and lazy image discovery.

(() => {
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryThumbGrid = document.getElementById('galleryThumbGrid');
  const galleryPrevPage = document.getElementById('galleryPrevPage');
  const galleryNextPage = document.getElementById('galleryNextPage');
  const galleryPageStatus = document.getElementById('galleryPageStatus');
  const galleryPrev = document.querySelector('.gallery-nav.prev');
  const galleryNext = document.querySelector('.gallery-nav.next');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  if (!galleryTrack) return;

  const lang = document.documentElement.lang === 'fi' ? 'fi' : 'en';
  const text = {
    fi: {
      page: 'Sivu',
      loadingMore: 'Ladataan lisää',
      loadingGallery: 'Ladataan galleriaa',
      empty: 'Gallerian kuvat ilmestyvät tähän, kun tiedostot lisätään kansioon assets/images/gallery/carousel/.',
      openImage: 'Avaa galleriakuva',
    },
    en: {
      page: 'Page',
      loadingMore: 'Loading more',
      loadingGallery: 'Loading gallery',
      empty: 'Gallery images will appear here when files are added to assets/images/gallery/carousel/.',
      openImage: 'Open gallery image',
    },
  }[lang];

  const maxGalleryImages = 999;
  const galleryPageSize = 20;
  const galleryBatchSize = 40;
  const initialCarouselCount = 12;
  const galleryBasePath = '/assets/images/gallery/carousel/';
  const galleryThumbPath = '/assets/images/gallery/thumbs/';
  const galleryCaption = (index) => `Photo ${String(index).padStart(3, '0')}`;
  const loadedGallery = [];

  let activeGalleryIndex = 0;
  let galleryPage = 1;
  let nextGalleryIndex = 1;
  let galleryLoading = false;
  let galleryReachedEnd = false;

  function galleryFileName(index) {
    return `photo-${String(index).padStart(3, '0')}.jpg`;
  }

  function galleryImage(index) {
    const file = galleryFileName(index);
    return { index, medium: galleryBasePath + file, thumb: galleryThumbPath + file };
  }

  function testImage(item) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(item);
      img.onerror = () => resolve(null);
      img.src = item.medium;
    });
  }

  function renderGalleryPage() {
    if (!galleryThumbGrid) return;
    const pageCount = Math.max(1, Math.ceil(loadedGallery.length / galleryPageSize));
    galleryPage = Math.min(Math.max(galleryPage, 1), pageCount);
    const start = (galleryPage - 1) * galleryPageSize;
    const pageImages = loadedGallery.slice(start, start + galleryPageSize);

    galleryThumbGrid.innerHTML = pageImages
      .map(
        (item, index) =>
          `<button class="gallery-thumb" type="button" style="background-image:url('${item.thumb}'),url('${item.medium}')" aria-label="${text.openImage} ${start + index + 1}"></button>`,
      )
      .join('');

    galleryThumbGrid
      .querySelectorAll('.gallery-thumb')
      .forEach((item, index) => item.addEventListener('click', () => openLightbox(start + index)));

    if (galleryPageStatus) {
      galleryPageStatus.textContent = galleryLoading
        ? `${text.page} ${galleryPage} / ${pageCount} · ${text.loadingMore}`
        : `${text.page} ${galleryPage} / ${pageCount}`;
    }
    if (galleryPrevPage) galleryPrevPage.disabled = galleryPage <= 1;
    if (galleryNextPage) galleryNextPage.disabled = galleryPage >= pageCount && galleryReachedEnd;
  }

  function buildGallery(images) {
    if (!images.length) {
      galleryTrack.innerHTML = galleryLoading
        ? `<div class="gallery-loading"><span>${text.loadingGallery}</span></div>`
        : `<p class="lead">${text.empty}</p>`;
      if (galleryThumbGrid) {
        galleryThumbGrid.innerHTML = galleryLoading
          ? Array.from({ length: 8 }, () => '<div class="gallery-thumb is-loading" aria-hidden="true"></div>').join('')
          : '';
      }
      if (galleryPageStatus) galleryPageStatus.textContent = galleryLoading ? text.loadingGallery : `${text.page} 0 / 0`;
      if (galleryPrevPage) galleryPrevPage.disabled = true;
      if (galleryNextPage) galleryNextPage.disabled = true;
      return;
    }

    const carouselImages = images.slice(0, Math.min(images.length, initialCarouselCount));
    galleryTrack.innerHTML = carouselImages
      .map(
        (item, index) =>
          `<figure class="gallery-slide" style="background-image:url('${item.medium}')" tabindex="0" role="button" aria-label="${text.openImage} ${index + 1}"><span>${galleryCaption(index + 1)}</span></figure>`,
      )
      .join('');

    renderGalleryPage();
    galleryTrack.querySelectorAll('.gallery-slide').forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(index);
        }
      });
    });
  }

  async function loadNextGalleryBatch() {
    if (galleryLoading || galleryReachedEnd) return;
    galleryLoading = true;
    buildGallery(loadedGallery);

    const batch = [];
    const end = Math.min(maxGalleryImages, nextGalleryIndex + galleryBatchSize - 1);
    for (let index = nextGalleryIndex; index <= end; index += 1) batch.push(testImage(galleryImage(index)));
    nextGalleryIndex = end + 1;

    const results = await Promise.all(batch);
    results.filter(Boolean).forEach((item) => loadedGallery.push(item));
    if (nextGalleryIndex > maxGalleryImages) galleryReachedEnd = true;
    if (results.every((item) => !item)) galleryReachedEnd = true;
    galleryLoading = false;
    buildGallery(loadedGallery);
  }

  function ensureGalleryPageAvailable(direction = 1) {
    const pageCount = Math.max(1, Math.ceil(loadedGallery.length / galleryPageSize));
    if (direction > 0 && galleryPage >= pageCount && !galleryReachedEnd) {
      loadNextGalleryBatch();
      return false;
    }
    return true;
  }

  function showLightboxImage(index) {
    if (!loadedGallery.length || !lightboxImg) return;
    activeGalleryIndex = (index + loadedGallery.length) % loadedGallery.length;
    lightboxImg.style.backgroundImage = `url('${loadedGallery[activeGalleryIndex].medium}')`;
  }

  function openLightbox(index) {
    if (!lightbox) return;
    showLightboxImage(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function stepLightbox(direction) {
    if (lightbox && lightbox.classList.contains('is-open')) showLightboxImage(activeGalleryIndex + direction);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.classList.contains('lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') stepLightbox(-1);
      if (event.key === 'ArrowRight') stepLightbox(1);
    });
  }

  if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));

  function scrollGallery(direction) {
    const card = galleryTrack.querySelector('.gallery-slide');
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    const max = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    if (direction > 0 && galleryTrack.scrollLeft >= max - 4) galleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
    else if (direction < 0 && galleryTrack.scrollLeft <= 4) galleryTrack.scrollTo({ left: max, behavior: 'smooth' });
    else galleryTrack.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  if (galleryPrev) galleryPrev.addEventListener('click', () => scrollGallery(-1));
  if (galleryNext) galleryNext.addEventListener('click', () => scrollGallery(1));
  if (galleryPrevPage) galleryPrevPage.addEventListener('click', () => { galleryPage -= 1; renderGalleryPage(); });
  if (galleryNextPage) galleryNextPage.addEventListener('click', () => {
    if (ensureGalleryPageAvailable(1)) {
      galleryPage += 1;
      renderGalleryPage();
    }
  });

  loadNextGalleryBatch();
})();
