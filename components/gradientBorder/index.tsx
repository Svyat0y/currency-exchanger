import {FC} from "react"
import styles from "./gradientBorder.module.scss"
import classNames from "classnames"

type GradientBorderProps = {
	isCalculated?: boolean
	active: boolean
	disabled?: boolean
}

export const GradientBorder:FC<GradientBorderProps> = ({isCalculated, active, disabled}) => {
	return (
		<>
			<span className={styles.border}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: !isCalculated && active && !disabled
				})}>
			</div>
		</>
	)
}