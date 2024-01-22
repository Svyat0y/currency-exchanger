import {FC} from "react"
import styles from "./gradientBorder.module.scss"
import classNames from "classnames"
import {useNotificationContext} from "@/context/notificationContext"

type GradientBorderProps = {
	className?: string
	active: boolean
	withoutAnim?: boolean
	smallRadius?: boolean
	withoutGrayBorder?: boolean
	borderRadius?: number
	isIgnoredOverlay?: boolean
}

export const GradientBorder:FC<GradientBorderProps> = (
	{
		active,
		withoutAnim,
		smallRadius,
		withoutGrayBorder,
		borderRadius = 22,
		isIgnoredOverlay,
		className,
	}) => {
	const {isOverlay} = useNotificationContext()

	return (
		<>
			<span className={classNames(styles.border, className, {
				[styles.smallRadius]: smallRadius,
				[styles.withoutGrayBorder]: withoutGrayBorder,
			})} style={{borderRadius: borderRadius}}></span>
			<div
				className={classNames(styles.gradientBlock, className, {
					[styles.active]: active,
					[styles.hideGradient]: active && isOverlay && !isIgnoredOverlay,
					[styles.withoutAnim]: withoutAnim,
					[styles.smallRadius]: smallRadius,
				})} style={{borderRadius: borderRadius}}>
			</div>
		</>
	)
}