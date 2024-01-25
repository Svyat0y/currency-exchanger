import {FC} from "react"
import styles from './exhangeCard.module.scss'
import classNames from "classnames"
import {Portal} from "@/components/portal"

type TooltipFeeProps = {
	active: boolean
	toolTipText?: string
	tooltipPosition: {top: number, left: number}
}

export const TooltipFee: FC<TooltipFeeProps> = ({active, toolTipText = 'Floating or Fixed rate', tooltipPosition}) => {

	return (
		<Portal>
			<p className={classNames(styles.tooltipFee, {
				[styles.active]: active
			})} style={{top: tooltipPosition.top, left: tooltipPosition.left}}>{toolTipText}</p>
		</Portal>
	)
}