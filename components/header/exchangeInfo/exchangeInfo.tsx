"use client"

import styles from './exchangeInfo.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useExchangeContext} from "@/context/exchangeContext"
import {RATES, RATES_TOOLTIP} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {GetValueBox} from "@/components/header/exchangeInfo/getValueBox"
import {SendValueBox} from "@/components/header/exchangeInfo/sendValueBox"
import {Overlay} from "@/components/overlay/overlay"
import {useState} from "react"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {useNotificationContext} from "@/context/notificationContext"

export const ExchangeInfo = () => {
	const {rateState, secondStep} = useExchangeContext()
	const {setIsOverlay} = useNotificationContext()
	const [isTooltip, setIsTooltip] = useState(false)
	const isFixedRate = rateState === RATES.fixed
	const ratesInfo = rateState === RATES.fixed ? RATES_TOOLTIP.fixedRate : RATES_TOOLTIP.floatRate

	const handleShowTooltip = () => {
		setIsTooltip(true)
		setIsOverlay(true)
	}

	const handleRemoveTooltip = () => {
		setIsTooltip(false)
		setIsOverlay(false)
	}

	return (
		<>
			<div className={classNames(styles.exchangeInfo, {
				[styles.active]: secondStep
			})}>
				<div className={styles.left}>
					<SendValueBox/>
					<GetValueBox/>
				</div>
				<TooltipTrigger className={styles.rateBox} isTooltip={isTooltip} backgroundColor={isFixedRate? '#28C600FF' : 'black'} tooltipContent={ratesInfo} tag={'button'} handleShowTooltip={handleShowTooltip} handleRemoveTooltip={handleRemoveTooltip}>
					<Icon type={isFixedRate ? 'LOCK' : 'WATER'} fill={isFixedRate ? '#28C600' : 'rgba(0, 0, 0, .3)'}/>
				</TooltipTrigger>
			</div>
			<Overlay zIndex={30}/>
		</>
	)
}