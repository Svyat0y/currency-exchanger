import {FC} from "react"
import styles from "./gradientBorder.module.scss"
import classNames from "classnames"

type GradientBorderProps = {
	active: boolean
}

export const GradientBorder:FC<GradientBorderProps> = ({active}) => {
	return (
		<>
			<span className={styles.border}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: active
				})}>
			</div>
		</>
	)
}