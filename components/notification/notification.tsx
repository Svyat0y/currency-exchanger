import styles from './notification.module.scss'
import {FC, ReactNode, useEffect} from "react"

type NotificationProps = {
	children: ReactNode
	isNotification: boolean
	setIsNotification: (state: boolean) => void
}

export const Notification: FC<NotificationProps> = ({children, isNotification, setIsNotification}) => {

	useEffect(() => {
		let timer: any

		timer = setTimeout(() => {
			setIsNotification(false)
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
	}, [isNotification])

	return (
		<div className={styles.wrapper}>
			{children}
		</div>
	)
}