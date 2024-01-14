import {createContext, ReactNode, useContext, useState} from "react"
import {Item} from "@/types/types"
import {currencies} from "@/components/exchanger/data"

type TExchangeContext = {
	children: ReactNode
}

type TExchange = {
	sendItem: Item
	getItem: Item
	sendValue: number | string | null
	getValue: number | string | null
	wallet: number | string | null
	setSendItem: (item: Item) => void
	setGetItem: (item: Item) => void
	setSendValue: (value: number | string | null) => void
	setGetValue: (value: number | string | null) => void
	setWallet: (value: number | string | null) => void
	rateState: number
	setRateState: (rate: number) => void
	setSecondStep: (step: boolean) => void
	secondStep: boolean
}

const exchangeContext = createContext<TExchange | null>(null)

export const useExchangeContext = () => {
	const context = useContext(exchangeContext)
	if (!context) {
		throw new Error("ExchangeContextProvider must be used within a ExchangeContextProvider")
	}
	return context
}

export const ExchangeContextProvider = ({children}: TExchangeContext) => {
	const [sendItem, setSendItem] = useState<Item>(currencies[0])
	const [getItem, setGetItem] = useState<Item>(currencies[4])
	const [sendValue, setSendValue] = useState<number | string | null>(null)
	const [getValue, setGetValue] = useState<number | string | null>(null)
	const [wallet, setWallet] = useState<number | string | null>('')
	const [rateState, setRateState] = useState(1)
	const [secondStep, setSecondStep] = useState(false)

	const value = {
		sendItem,
		setSendItem,
		getItem,
		setGetItem,
		sendValue,
		setSendValue,
		getValue,
		setGetValue,
		wallet,
		setWallet,
		rateState,
		setRateState,
		setSecondStep,
		secondStep,
	}


	return (
		<exchangeContext.Provider value={value}>
			{children}
		</exchangeContext.Provider>
	)
}