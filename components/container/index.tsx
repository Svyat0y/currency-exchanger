import {FC, ReactNode} from "react"
import styles from './container.module.scss'

type ContainerProps = {
	children: ReactNode
	overflow?: string
}

export const Container: FC<ContainerProps> = ({children, overflow}) => {
	return (
		<div className={styles.wrapper} style={{overflow: overflow}}>
				{children}
		</div>
	)
}