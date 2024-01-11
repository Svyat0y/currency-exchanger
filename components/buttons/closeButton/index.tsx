import {FC} from "react"
import styles from './closeButton.module.scss'
import classNames from "classnames"

type CloseButton = {
	onClick?: () => void
	className?: string
}

export const CloseButton: FC<CloseButton> = ({onClick, className}) => {
	return (
		<button aria-label='Close' onClick={onClick} className={classNames(styles.wrapper, className)}></button>
	)
}