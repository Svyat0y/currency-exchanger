import styles from './rateSwitcher.module.scss'
import {NavigationBox} from "@/components/navigationBox/navigationBox"
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useExchangeContext} from "@/context/exchangeContext"
import {useNotificationContext} from "@/context/notificationContext"

export const RATES = {
	floating: 1,
	fixed: 2
}

export const RATES_TOOLTIP = {
	fixedRate: 'Fixed Rate',
	floatRate: 'Floating Rate',
}

export const RateSwitcher = () => {
	const {rateState, setRateState} = useExchangeContext()
	const {setIsNotification} = useNotificationContext()
	const isFixedRate = rateState === RATES.fixed
	const isFloatingRate = rateState === RATES.floating

	const handleFixedRate = () => {
		setRateState(RATES.fixed)
		setIsNotification(true)
	}

	const handleFloatRate = () => {
		setRateState(RATES.floating)
		setIsNotification(true)
	}

	return (
		<div className={classNames(styles.cardNav)}>
			<NavigationBox isShadow={false}>
				<button onClick={handleFloatRate} className={classNames(styles.navBtn, {
					[styles.active]: isFloatingRate
				})}>
					<Icon type='WATER'/>
				</button>
				<button onClick={handleFixedRate} className={classNames(styles.navBtn, {
					[styles.active]: isFixedRate
				})}>
					<Icon type='LOCK' fill={isFixedRate ? '#28C600' : 'rgba(0, 0, 0, .3)'}/>
				</button>
			</NavigationBox>
		</div>
	)
}