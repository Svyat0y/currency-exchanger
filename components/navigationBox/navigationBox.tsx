import styles from './navigation.module.scss'
import {FC, ReactNode} from "react"
import classNames from "classnames";

type NavigationBoxProps = {
	children: ReactNode
	isShadow: boolean
}

export const NavigationBox: FC<NavigationBoxProps> = ({children, isShadow = true}) => {
	return (
		<div className={classNames(styles.navigationBtns, {
			[styles.isShadow]: isShadow
		})}>
			{children}
		</div>
	)
}