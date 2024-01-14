"use client"

import {ReactNode} from "react"
import {ExchangeContextProvider} from "@/context/exchangeContext"
import {NotificationContextProvider} from "@/context/notificationContext"

export interface ProvidersProps {
	children: ReactNode;
}

export function Providers ({children}: ProvidersProps) {
	return (
		<NotificationContextProvider>
			<ExchangeContextProvider>
				{children}
			</ExchangeContextProvider>
		</NotificationContextProvider>
	)
}
