import styles from './overlay.module.scss'
import classNames from "classnames"
import {FC, ReactNode, useEffect} from "react"

type OverlayProps = {
	zIndex?: number
	active: boolean
	children?: ReactNode
}

export const Overlay: FC<OverlayProps> = ({zIndex = 30, active, children}) => {

	useEffect(() => {
		let originalStyle: string

		if (active) {
			originalStyle = window.getComputedStyle(document.body).overflow
			document.body.style.overflow = 'hidden'
		}
		else {
			document.body.style.overflowX = 'hidden'
		}

		return () => {
			document.body.style.overflow = originalStyle
		}
	}, [active])

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active,
		})} style={{zIndex: zIndex}}>
			{children}
		</div>
	)
}