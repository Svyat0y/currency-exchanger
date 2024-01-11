import React, {FC, ReactNode} from "react"
import styles from './customTooltip.module.scss'
import classNames from "classnames"

type CustomTooltipProps = {
	children: ReactNode
	className?: string
	backgroundColor: string
	isTooltip: boolean
}

export const CustomToolTip: FC<CustomTooltipProps> = (
	{
		className,
		backgroundColor,
		isTooltip,
		children
	}) => {

	return (
		<div
			className={classNames(styles.wrapper, className, {
				[styles.active]: isTooltip
			})} style={{backgroundColor: backgroundColor}}>
			{children}
		</div>
	)
}