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
		mapUrl: 'https://maps.app.goo.gl/HNQA1oWikfVxQ3jx7',
		mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.17538397149832!2d25.038336366254658!3d60.28986518201155!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469207e96850bfeb%3A0x21c237ad94d588a9!2sMidori%20Beauty!5e0!3m2!1svi!2sfi!4v1793751909423!5m2!1svi!2sfi',
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
