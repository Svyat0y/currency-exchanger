import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {useExchangeContext} from "@/context/exchangeContext"
import {useNotificationContext} from "@/context/notificationContext"
import {IconButton} from "@/components/buttons/iconButton/iconButton"

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
		<NavigationBox isBorder={true}>
			<IconButton icon="WATER" onClick={handleFloatRate} active={isFloatingRate}/>
			<IconButton icon="LOCK" onClick={handleFixedRate} active={isFixedRate}/>
		</NavigationBox>
	)
}