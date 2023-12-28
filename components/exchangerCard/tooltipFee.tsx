import {FC, useEffect, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"

type TooltipFeeProps = {
	isLocked: boolean
}

const toolTipsInfo = {
	locked: '+0,5% fee',
	unlocked: '+0% fee'
}

export const TooltipFee: FC<TooltipFeeProps> = ({isLocked}) => {
	const [toolTipText, setToolTipText] = useState('')

	useEffect(() => {
		isLocked
			? setToolTipText(toolTipsInfo.locked)
			: setToolTipText(toolTipsInfo.unlocked)

	}, [isLocked])

	return <p className={classNames(styles.tooltipFee, {
		[styles.active]: isLocked
	})}>{toolTipText}</p>
}