import styles from './gradientText.module.scss'
import {FC, ReactNode} from "react"
import classNames from "classnames"

type GradientText = {
	children: ReactNode
	isUppercase?: boolean
	noGradient?: boolean
}

export const GradientText: FC<GradientText> = ({children, isUppercase, noGradient}) => {
	return (
		<span className={classNames(styles.wrapper, {
			[styles.isUpercase]: isUppercase,
			[styles.noGradient]: noGradient,
		})}>
			{children}
		</span>
	)
}