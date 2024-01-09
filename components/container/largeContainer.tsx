import {FC, ReactNode} from "react"
import styles from './container.module.scss'

type ContainerProps = {
	children: ReactNode
}

export const LargeContainer: FC<ContainerProps> = ({children}) => {
	return (
		<div className={styles.largeContainer}>{children}</div>
	)
}