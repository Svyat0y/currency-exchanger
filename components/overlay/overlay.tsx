import styles from './overlay.module.scss'
import classNames from "classnames"
import {useExchangeContext} from "@/context/exchangeContext"
import {FC} from "react"

type OverlayProps = {
	zIndex?: number
}

export const Overlay: FC<OverlayProps> = ({zIndex = 30}) => {
	const {isOverlay} = useExchangeContext()

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: isOverlay,
		})} style={{zIndex: zIndex}}></div>
	)
}