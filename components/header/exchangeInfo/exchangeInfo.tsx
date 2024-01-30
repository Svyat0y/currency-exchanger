import styles from './exchangeInfo.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useExchangeContext} from "@/context/exchangeContext"
import {RATES, RATES_TOOLTIP} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {GetValueBox} from "@/components/header/exchangeInfo/getValueBox"
import {SendValueBox} from "@/components/header/exchangeInfo/sendValueBox"
import {FC, useEffect, useRef, useState} from "react"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {useNotificationContext} from "@/context/notificationContext"
import {Overlay} from "@/components/overlay/overlay"
import {ANIMATION_TIME} from "@/app/const"
import {useMount} from "@/hooks/useMount"

type ExchangeInfoProps = {
	active: boolean,
	isOpenNavMenu: boolean
	style?: string
}

export const ExchangeInfo: FC<ExchangeInfoProps> = ({active, isOpenNavMenu, style = ''}) => {
	const {rateState} = useExchangeContext()
	const {setIsOverlay, isOverlay} = useNotificationContext()
	const [rateStateLs, setRateStateLs] = useState()
	const [isTooltip, setIsTooltip] = useState(false)
	const isFixedRate = rateStateLs === RATES.fixed || rateState === RATES.fixed
	const ratesInfo = rateState === RATES.fixed ? RATES_TOOLTIP.fixedRate : RATES_TOOLTIP.floatRate
	const originalZIndex = useRef<string | null>(null)

	useEffect(() => {
		const rateState = localStorage.getItem('rateState')

		if (rateState) {
			setRateStateLs(JSON.parse(rateState))
		}

	}, [rateState])

	useEffect(() => {
		const element = document.getElementById('exchangeInfo')

		if (isOpenNavMenu) {
			if (element) {
				if (originalZIndex.current === null) {
					originalZIndex.current = element.style.zIndex;
				}
				element.style.zIndex = '50'
			}
		} else {
			setTimeout(() => {
				if (element && originalZIndex.current !== null) {
					element.style.zIndex = originalZIndex.current;
					originalZIndex.current = null
				}
			}, ANIMATION_TIME)
		}
	}, [isOpenNavMenu])

	const handleShowTooltip = () => {
		setIsTooltip(true)
		setIsOverlay(true)
	}

	const handleRemoveTooltip = () => {
		setIsTooltip(false)
		setIsOverlay(false)
	}

	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<>
			<div id={'exchangeInfo'} className={classNames(styles.exchangeInfo, {
				[styles.active]: active && mounted,
				[styles.zIndexUp]: isOverlay,
			})}>
				<div className={classNames(styles.left, {
					[styles.isFixed]: isFixedRate,
				})}>
					<SendValueBox/>
					<GetValueBox noActive={isFixedRate}/>
				</div>
				<TooltipTrigger
					className={classNames(styles.rateBox, {[styles.isFixed]: isFixedRate})}
					isTooltip={isTooltip}
					backgroundColorTooltip={isFixedRate? '#28C600FF' : 'black'}
					tooltipContent={ratesInfo} tag={'button'}
					handleShowTooltip={handleShowTooltip}
					handleRemoveTooltip={handleRemoveTooltip}
				>
					<Icon type={isFixedRate ? 'LOCK' : 'WATER'} fill={isFixedRate ? '#28C600' : 'black'}/>
				</TooltipTrigger>
			</div>
			<Overlay active={isTooltip} zIndex={116}/>
		</>
	)
}