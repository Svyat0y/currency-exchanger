import {Container} from "@/components/container"
import {FC, ReactNode} from "react"
import {Providers} from "@/app/providers"

type LayoutProps = {
	children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
	return (
		<Providers>
			<Container>
				{children}
			</Container>
		</Providers>
	)
}