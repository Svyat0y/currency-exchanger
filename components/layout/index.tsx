"use client"

import {FC, ReactNode} from "react"
import {Providers} from "@/app/providers"
import {Header} from "@/components/header"

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
			</Providers>
		</>
	)
}