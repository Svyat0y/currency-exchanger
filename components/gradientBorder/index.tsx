import {FC} from "react"
import styles from "./gradientBorder.module.scss"
import classNames from "classnames"
import {useNotificationContext} from "@/context/notificationContext"

type GradientBorderProps = {
	active: boolean
	withoutAnim?: boolean
	smallRadius?: boolean
	withoutGrayBorder?: boolean
}

export const GradientBorder:FC<GradientBorderProps> = (
	{
		active,
		withoutAnim,
		smallRadius,
		withoutGrayBorder,
	}) => {
	const {isOverlay} = useNotificationContext()

	return (
		<>
			<span className={classNames(styles.border, {
				[styles.smallRadius]: smallRadius,
				[styles.withoutGrayBorder]: withoutGrayBorder,
			})}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: active,
					[styles.hideGradient]: active && isOverlay,
					[styles.withoutAnim]: withoutAnim,
					[styles.smallRadius]: smallRadius,
				})}>
			</div>
		</>
	)
}