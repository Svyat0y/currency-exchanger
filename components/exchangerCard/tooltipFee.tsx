import {FC, useEffect, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames";

type TooltipFeeProps = {
	isTriggerTooltip: boolean
	isLocked: boolean
}

const toolTipsInfo = {
	locked: '+0,5% fee',
	unlocked: '+0% fee'
}

export const TooltipFee: FC<TooltipFeeProps> = ({isTriggerTooltip, isLocked}) => {
	const [toolTipText, setToolTipText] = useState('')

	useEffect(() => {
		isTriggerTooltip && isLocked
			? setToolTipText(toolTipsInfo.locked)
			: setToolTipText(toolTipsInfo.unlocked)

	}, [isLocked])

	return <p className={classNames(styles.tooltipFee, {
		[styles.active]: isLocked
	})}>{toolTipText}</p>
}