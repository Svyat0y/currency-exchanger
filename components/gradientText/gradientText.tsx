import styles from './gradientText.module.scss'
import {ReactNode} from "react"
import classNames from "classnames"

export const GradientText = ({children, isUppercase}: {children: ReactNode, isUppercase?: boolean}) => {
	return (
		<span className={classNames(styles.wrapper, {[styles.isUpercase]: isUppercase})}>
			{children}
		</span>
	)
}