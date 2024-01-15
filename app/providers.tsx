"use client"

import {ReactNode} from "react"
import {ExchangeContextProvider} from "@/context/exchangeContext"
import {NotificationContextProvider} from "@/context/notificationContext"
import {StatusContextProvider} from "@/context/statusContext"

export interface ProvidersProps {
	children: ReactNode;
}

export function Providers ({children}: ProvidersProps) {
	return (
		<StatusContextProvider>
			<NotificationContextProvider>
				<ExchangeContextProvider>
					{children}
				</ExchangeContextProvider>
			</NotificationContextProvider>
		</StatusContextProvider>
	)
}
