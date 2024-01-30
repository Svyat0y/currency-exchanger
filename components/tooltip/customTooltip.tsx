import React, {FC, ReactNode} from "react"
import styles from './customTooltip.module.scss'
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"

type CustomTooltipProps = {
	children: ReactNode
	className?: string
	backgroundColorTooltip: string
	isTooltip: boolean
}

export const CustomToolTip: FC<CustomTooltipProps> = (
	{
		className,
		backgroundColorTooltip,
		isTooltip,
		children
	}) => {

	const {mounted} = useMount(isTooltip)

	if (!isTooltip && !mounted) return null

	return (
		<div
			className={classNames(styles.wrapper, className, {
				[styles.active]: isTooltip && mounted
			})} style={{backgroundColor: backgroundColorTooltip}}>
			{children}
		</div>
	)
}