import styles from './navigation.module.scss'
import {FC, ReactNode} from "react"

type NavigationBoxProps = {
	children: ReactNode
}

export const NavigationBox: FC<NavigationBoxProps> = ({children}) => {
	return (
		<div className={styles.navigationBtns}>
			{children}
		</div>
	)
}