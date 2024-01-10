"use client"

import {ReactNode} from "react"
import {ExchangeContextProvider} from "@/context/exchangeContext"

export interface ProvidersProps {
	children: ReactNode;
}

export function Providers ({children}: ProvidersProps) {
	return (
		<ExchangeContextProvider>
			{children}
		</ExchangeContextProvider>
	)
}
