import styles from './exchangeInfo.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useExchangeContext} from "@/context/exchangeContext"
import {RATES, RATES_TOOLTIP} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {GetValueBox} from "@/components/header/exchangeInfo/getValueBox"
import {SendValueBox} from "@/components/header/exchangeInfo/sendValueBox"
import {useEffect, useState} from "react"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {useNotificationContext} from "@/context/notificationContext"
import {useContextStatus} from "@/context/statusContext"

export const ExchangeInfo = () => {
	const {rateState} = useExchangeContext()
	const {currentStatus} = useContextStatus()
	const {setIsOverlay, isOverlay} = useNotificationContext()
	const [rateStateLs, setRateStateLs] = useState()
	const [isTooltip, setIsTooltip] = useState(false)
	const isFixedRate = rateStateLs === RATES.fixed || rateState === RATES.fixed
	const ratesInfo = rateState === RATES.fixed ? RATES_TOOLTIP.fixedRate : RATES_TOOLTIP.floatRate

	useEffect(() => {
		const rateState = localStorage.getItem('rateState')

		if (rateState) {
			setRateStateLs(JSON.parse(rateState))
		}

	}, [rateState])

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
				[styles.active]: !!currentStatus,
				[styles.zIndexUp]: isOverlay
			})}>
				<div className={styles.left}>
					<SendValueBox/>
					<GetValueBox noActive={isFixedRate}/>
				</div>
				<TooltipTrigger
					className={styles.rateBox}
					isTooltip={isTooltip}
					backgroundColor={isFixedRate? '#28C600FF' : 'black'}
					tooltipContent={ratesInfo} tag={'button'}
					handleShowTooltip={handleShowTooltip}
					handleRemoveTooltip={handleRemoveTooltip}
				>
					<Icon type={isFixedRate ? 'LOCK' : 'WATER'} fill={isFixedRate ? '#28C600' : 'rgba(0, 0, 0, .3)'}/>
				</TooltipTrigger>
			</div>
			<div className={classNames(styles.tooltipOverlay, {
				[styles.active]: isTooltip
			})}></div>
		</>
	)
}