"use client"

import {FC, ReactNode} from "react"
import {Providers} from "@/app/providers"
import {Header} from "@/components/header"
import {NotificationContainer} from "@/components/notificationContainer/notificationContainer"

type LayoutProps = {
	children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {

	return (
		<>
			<Providers>
				<Header/>
				<main>
					{children}
				</main>
				<NotificationContainer/>
			</Providers>
		</>
	)
}