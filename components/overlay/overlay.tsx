import styles from './overlay.module.scss'
import classNames from "classnames"
import {FC} from "react"
import {useNotificationContext} from "@/context/notificationContext"

type OverlayProps = {
	zIndex?: number
}

export const Overlay: FC<OverlayProps> = ({zIndex = 30}) => {
	const {isOverlay} = useNotificationContext()

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: isOverlay,
		})} style={{zIndex: zIndex}}></div>
	)
}