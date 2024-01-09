import type {Metadata} from 'next'
import '../styles/global.scss'


export const metadata: Metadata = {
	title: 'SwapHub',
	description: 'SwapHub Exchanger',
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
}


export default function RootLayout({children}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Exchanger</title>
			</head>
			<body>{children}</body>
		</html>
	)
}
