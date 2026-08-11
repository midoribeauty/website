export type Lang = 'fi' | 'en';
export type RouteKey =
	| 'home'
	| 'about'
	| 'services'
	| 'prices'
	| 'contact'
	| 'booking'
	| 'gallery';

export type SeoMeta = {
	title: string;
	description: string;
	path: string;
};

export const seo = {
	fi: {
		home: {
			title: 'Midori Beauty · Kotistudio | Ripsienpidennykset, kynnet & jalkaspa',
			description: 'Midori Beauty on yksityinen ripsien, kynsien ja jalkojenhoidon kotistudio Tikkurilassa, Vantaalla.',
			path: '/fi/',
		},
		about: {
			title: 'Esittely · Midori Beauty | Yksityinen ripsi-, kynsi- ja jalkahoitostudio',
			description: 'Midori Beauty on yksityinen ripsien, kynsien ja jalkojenhoidon kotistudio Tikkurilassa, Vantaalla — rauhallinen, henkilökohtainen ja rakennettu yksi asiakas kerrallaan.',
			path: '/fi/about/',
		},
		services: {
			title: 'Palvelut · Midori Beauty | Ripset, kynnet ja jalkojenhoito Tikkurilassa',
			description: 'Tutustu Midori Beautyn ripsi-, kynsi- ja jalkojenhoitopalveluihin — yksityinen, rauhallinen kotistudio Tikkurilassa, Vantaalla. Hinnat ja vapaat ajat löytyvät Hinnat-sivulta.',
			path: '/fi/services/',
		},
		prices: {
			title: 'Hinnat · Midori Beauty | Ripset, kynnet ja jalkojenhoito Tikkurilassa',
			description: 'Yleiskatsaus Midori Beautyn ripsi-, kynsi- ja jalkojenhoitopalveluihin Tikkurilassa, Vantaalla. Tarkat hinnat ja vapaat ajat näet suoraan varauskalenterista.',
			path: '/fi/prices/',
		},
		contact: {
			title: 'Yhteys · Midori Beauty | Yksityinen studio Tikkurilassa',
			description: 'Varaa yksityinen ripsi-, kynsi- tai jalkahoitoaikasi Midori Beautysta Tikkurilassa, Vantaalla.',
			path: '/fi/contact/',
		},
		booking: {
			title: 'Varaa aika · Midori Beauty',
			description: 'Varaa Midori Beauty -aikasi verkossa Timman kautta.',
			path: '/fi/booking/',
		},
		gallery: {
			title: 'Galleria · Midori Beauty | Ripsi-, kynsi- ja jalkojenhoitostudio Tikkurilassa',
			description: 'Visuaalinen katsaus Midori Beautyn yksityiseen ripsi-, kynsi- ja jalkojenhoitostudioon Tikkurilassa, Vantaalla.',
			path: '/fi/gallery/',
		},
	},
	en: {
		home: {
			title: 'Midori Beauty · Home Studio | Eyelash extensions, nails & foot spa',
			description: 'Midori Beauty is a private lash, nail and foot care home studio in Tikkurila, Vantaa.',
			path: '/en/',
		},
		about: {
			title: 'About · Midori Beauty | Private lash, nail &amp; foot care home studio',
			description: 'Midori Beauty is a private lash, nail and foot care home studio in Tikkurila, Vantaa — calm, personal, and built around one client at a time.',
			path: '/en/about/',
		},
		services: {
			title: 'Services · Midori Beauty | Lash, nail &amp; foot care in Tikkurila',
			description: 'Explore lash, nail and foot care services at Midori Beauty — a private, calm home studio in Tikkurila, Vantaa. Pricing and available times are on the Prices page.',
			path: '/en/services/',
		},
		prices: {
			title: 'Prices · Midori Beauty | Lash, nail &amp; foot care in Tikkurila',
			description: 'An overview of lash, nail and foot care services at Midori Beauty in Tikkurila, Vantaa. Exact prices and availability are shown instantly in the booking calendar.',
			path: '/en/prices/',
		},
		contact: {
			title: 'Contact · Midori Beauty | Private beauty studio in Tikkurila',
			description: 'Book your private lash, nail or foot care appointment at Midori Beauty in Tikkurila, Vantaa.',
			path: '/en/contact/',
		},
		booking: {
			title: 'Book now · Midori Beauty',
			description: 'Book your Midori Beauty appointment online through Timma.',
			path: '/en/booking/',
		},
		gallery: {
			title: 'Gallery · Midori Beauty | Lash, nail & foot care studio in Tikkurila',
			description: "A visual glimpse into Midori Beauty's private lash, nail and foot care studio in Tikkurila, Vantaa.",
			path: '/en/gallery/',
		},
	},
} as const satisfies Record<Lang, Record<RouteKey, SeoMeta>>;
