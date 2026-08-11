import type { Lang } from './navigation';

export const galleryConfig = {
	maxImages: 999,
	pageSize: 20,
	batchSize: 40,
	initialCarouselCount: 12,
	basePath: '/assets/images/gallery/carousel/',
	thumbPath: '/assets/images/gallery/thumbs/',
	filePrefix: 'photo-',
	fileExtension: '.jpg',
} as const;

export const galleryText = {
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
} as const satisfies Record<Lang, {
	page: string;
	loadingMore: string;
	loadingGallery: string;
	empty: string;
	openImage: string;
}>;

export const galleryRuntimeConfig = (lang: Lang) => ({
	...galleryConfig,
	text: galleryText[lang],
});
