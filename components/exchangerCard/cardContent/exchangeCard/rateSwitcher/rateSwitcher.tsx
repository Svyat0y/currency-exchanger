import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {FC, useEffect, useRef, useState} from "react"
import {TooltipFee} from "@/components/exchangerCard/cardContent/exchangeCard/tooltipFee"
import {useNotificationContext} from "@/context/notificationContext"

export const RATES = {
	floating: 1,
	fixed: 2
}

export const RATES_TOOLTIP = {
	fixedRate: 'Fixed Rate',
	floatRate: 'Floating Rate',
}

type RateSwitcherProps = {
	rateState: number
	setRateState: (rate: number) => void
	setIsNotification: (state: boolean) => void
	withTooltip?: boolean
}

export const RateSwitcher: FC<RateSwitcherProps> = ({rateState, setRateState, setIsNotification, withTooltip = false}) => {
	const isFixedRate = rateState === RATES.fixed
	const isFloatingRate = rateState === RATES.floating
	const {setIsOverlay} = useNotificationContext()
	const [isTooltip, setIsTooltip] = useState(false)
	const navBoxRef = useRef<HTMLDivElement | null>(null)
	const [tooltipPosition, setTooltipPosition] = useState({top: 0, left: 0})

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

	const handleShowTooltip = () => {
		setIsTooltip(true)
		setIsOverlay(true)
	}

	const handleCloseTooltip = () => {
		setIsTooltip(false)
		setIsOverlay(false)
	}

	useEffect(() => {
		const updateTooltipPosition = () => {
			if(navBoxRef.current && withTooltip) {
				const elementTopPosition = navBoxRef.current.getBoundingClientRect().top
				const elementLeftPosition = navBoxRef.current.getBoundingClientRect().left

				setTooltipPosition({
					top: elementTopPosition - 70,
					left: elementLeftPosition,
				})
			}
		}

		updateTooltipPosition()

		const handleResizeOrScroll = () => {
			updateTooltipPosition()
		}

		window.addEventListener('resize', handleResizeOrScroll)
		document.body.addEventListener('scroll', handleResizeOrScroll)

		return () => {
			window.removeEventListener('resize', handleResizeOrScroll)
			document.body.removeEventListener('scroll', handleResizeOrScroll)
		}
	}, [navBoxRef])

	useEffect(() => {
		const rateFromLs = localStorage.getItem('rateState')

		if(rateFromLs) {
			setRateState(JSON.parse(rateFromLs))
		}
	}, [])

	return (
		<>
			<NavigationBox ref={navBoxRef} isBorder={true} handleShowTooltip={handleShowTooltip} handleCloseTooltip={handleCloseTooltip}>
				<IconButton icon="WATER" onClick={handleFloatRate} active={isFloatingRate}/>
				<IconButton icon="LOCK" fill={isFixedRate ? '#28C600' : ''} onClick={handleFixedRate} active={isFixedRate}/>
			</NavigationBox>
			<TooltipFee active={isTooltip} tooltipPosition={tooltipPosition}/>
		</>
	)
}