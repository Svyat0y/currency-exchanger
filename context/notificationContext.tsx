import {createContext, ReactNode, useContext, useState} from "react"

type TNotificationContextProvider = {
	children: ReactNode
}

type TNotification = {
	isNotification: boolean
	isOverlay: boolean
	setIsNotification: (state: boolean) => void
	setIsOverlay: (state: boolean) => void
}

const notificationContext = createContext<null | TNotification>(null)

export const useNotificationContext = () => {
	const context = useContext(notificationContext)
	if (!context) {
		throw new Error("NotificationContextProvider must be used within a NotificationContextProvider")
	}
	return context
}

export const NotificationContextProvider = ({children}: TNotificationContextProvider) => {
	const [isNotification, setIsNotification] = useState(false)
	const [isOverlay, setIsOverlay] = useState(false)

	const value = {
		isNotification,
		isOverlay,
		setIsNotification,
		setIsOverlay
	}

	return (
		<notificationContext.Provider value={value}>
			{children}
		</notificationContext.Provider>
	)
}