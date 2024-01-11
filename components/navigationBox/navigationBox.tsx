import styles from './navigation.module.scss'
import {FC, ReactNode} from "react"
import classNames from "classnames"

type NavigationBoxProps = {
	children: ReactNode
	isShadow?: boolean
	className?: string
	isBorder?: boolean
}

export const NavigationBox: FC<NavigationBoxProps> = ({children, isShadow = true, className, isBorder = true}) => {
	return (
		<div className={classNames(styles.navigationBtns, className, {
			[styles.isShadow]: isShadow,
			[styles.isBorder]: isBorder,
		})}>
			{children}
		</div>
	)
}