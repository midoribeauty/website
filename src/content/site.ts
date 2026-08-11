export const site = {
	name: 'Midori Beauty',
	domain: 'https://midoribeauty.fi',
	displayDomain: 'www.midoribeauty.fi',
	serviceLine: 'Lashes, Nails & Foot Care',
	footerTagline: 'Private. No rush. No crowded salon. Just careful work.',
	address: {
		street: 'Neilikkatie 4C 43',
		postalCode: '01300',
		city: 'Vantaa',
		area: 'Tikkurila',
		floor: '5th floor',
		mapUrl: 'https://maps.google.com/?q=Neilikkatie%204C%2043,%2001300%20Vantaa',
		mapEmbedUrl: 'https://www.google.com/maps?q=Neilikkatie%204C%2043%2C%2001300%20Vantaa%2C%20Finland&output=embed',
	},
	contact: {
		phoneDisplay: '0408013412',
		phoneHref: 'tel:+358408013412',
		email: 'midoribeauty.fi@gmail.com',
		whatsappUrl: 'https://wa.me/358408013412',
	},
	links: {
		timmaProfile: 'https://timma.fi/yritys/midori-beauty',
		timmaBooking: 'https://varaa.timma.fi/midoribeauty',
		timmaEmbed: 'https://varaa.timma.fi/reservation/midoribeauty',
		instagram: 'https://instagram.com/midoribeauty.fi',
		tiktok: 'https://www.tiktok.com/@midoribeauty.fi',
		facebook: 'https://www.facebook.com/midoribeauty.fi',
	},
	assets: {
		logoWordmark: '/assets/logo-wordmark.png',
		icons: {
			location: '/assets/icons/location.svg',
			phone: '/assets/icons/phone.svg',
			email: '/assets/icons/email.svg',
			booking: '/assets/icons/booking.svg',
			timma: '/assets/icons/timma.svg',
			tiktok: '/assets/icons/tiktok.svg',
			facebook: '/assets/icons/facebook.svg',
			instagram: '/assets/icons/instagram.svg',
			whatsapp: '/assets/icons/whatsapp.svg',
		},
	},
} as const;

export type SiteConfig = typeof site;
