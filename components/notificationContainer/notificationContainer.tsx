import styles from './notificationContainer.module.scss'
import {createPortal} from "react-dom"
import {Notification} from "@/components/notification/notification"
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {RATES, RATES_TOOLTIP} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"
import {useExchangeContext} from "@/context/exchangeContext"
import {useNotificationContext} from "@/context/notificationContext"

export const NotificationContainer = () => {
	const {rateState, setRateState} = useExchangeContext()
	const {isNotification, setIsNotification} = useNotificationContext()
	const isFixedRate = rateState === RATES.fixed

	return (
		<>
			{createPortal(
				<Notification isNotification={isNotification} setIsNotification={setIsNotification}>
					<div className={classNames(styles.wrapper, {
						[styles.active]: isNotification,
						[styles.isFixed]: isFixedRate,
					})}>
						<Icon type={isFixedRate ? 'LOCK' : 'WATER'} fill='#fff'/>
						{isFixedRate ? RATES_TOOLTIP.fixedRate : RATES_TOOLTIP.floatRate}
					</div>
				</Notification>,
				document.body
			)}
		</>
	)
}