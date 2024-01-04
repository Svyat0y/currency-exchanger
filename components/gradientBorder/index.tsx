import {FC} from "react"
import styles from "./gradientBorder.module.scss"
import classNames from "classnames"

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
	return (
		<>
			<span className={classNames(styles.border, {
				[styles.smallRadius]: smallRadius,
				[styles.withoutGrayBorder]: withoutGrayBorder,
			})}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: active,
					[styles.withoutAnim]: withoutAnim,
					[styles.smallRadius]: smallRadius,
				})}>
			</div>
		</>
	)
}