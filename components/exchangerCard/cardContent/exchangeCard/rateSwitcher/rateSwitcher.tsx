import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {useExchangeContext} from "@/context/exchangeContext"
import {useNotificationContext} from "@/context/notificationContext"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {useEffect} from "react";

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
		localStorage.setItem('rateState', JSON.stringify(RATES.fixed))
	}

	const handleFloatRate = () => {
		setRateState(RATES.floating)
		localStorage.setItem('rateState', JSON.stringify(RATES.floating))
		setIsNotification(true)
	}

	useEffect(() => {
		const rateFromLs = localStorage.getItem('rateState')

		if(rateFromLs) {
			setRateState(JSON.parse(rateFromLs))
		}
	}, [])

	return (
		<NavigationBox isBorder={true}>
			<IconButton icon="WATER" onClick={handleFloatRate} active={isFloatingRate}/>
			<IconButton icon="LOCK" onClick={handleFixedRate} active={isFixedRate}/>
		</NavigationBox>
	)
}