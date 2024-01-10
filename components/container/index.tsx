import {FC, ReactNode} from "react"
import styles from './container.module.scss'
import {Header} from "@/components/header"

type ContainerProps = {
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({children}) => {
	return (
		<div className={styles.wrapper}>
			<Header/>
			<main className={styles.main}>
				{children}
			</main>
		</div>
	)
}