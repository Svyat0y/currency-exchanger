import {FC} from "react"
import styles from './closeButton.module.scss'

type CloseButton = {
	onClick?: () => void
}

export const CloseButton: FC<CloseButton> = ({onClick}) => {
	return (
		<button onClick={onClick} className={styles.wrapper}>
		</button>
	)
}