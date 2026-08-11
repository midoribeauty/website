export type Lang = 'fi' | 'en';

export type NavPageKey = 'home' | 'about' | 'services' | 'gallery' | 'prices' | 'contact' | 'booking';

export type NavItem = {
	key: NavPageKey;
	label: string;
};

export const navPages = ['home', 'about', 'services', 'gallery', 'prices', 'contact'] as const satisfies readonly NavPageKey[];

export const navLabels = {
	fi: {
		home: 'Etusivu',
		about: 'Esittely',
		services: 'Palvelut',
		gallery: 'Galleria',
		prices: 'Hinnat',
		contact: 'Yhteys',
		booking: 'Varaa aika',
		switchName: 'English',
	},
	en: {
		home: 'Home',
		about: 'About',
		services: 'Services',
		gallery: 'Gallery',
		prices: 'Prices',
		contact: 'Contact',
		booking: 'Book now',
		switchName: 'Suomi',
	},
} as const satisfies Record<Lang, Record<NavPageKey | 'switchName', string>>;

export const pagePath = (lang: Lang, page: NavPageKey) =>
	page === 'home' ? `/${lang}/` : `/${lang}/${page}/`;
