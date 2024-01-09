import {Container} from "@/components/container"
import {FC, ReactNode} from "react"

type LayoutProps = {
	children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
	return (
		<>
			<Container>
				{children}
			</Container>
		</>
	)
}