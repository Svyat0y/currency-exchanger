import {createContext, ReactNode, useContext} from "react"

type TExchangeContext = {
	children: ReactNode
}

const exchangeContext = createContext<any>(null)

export const useExchangeContext = () => {
	const context = useContext(exchangeContext)
	if (!context) {
		throw new Error("ExchangeContextProvider must be used within a ExchangeContextProvider")
	}
	return context;
}

export const ExchangeContextProvider = ({children}: TExchangeContext) => {


	return (
		<exchangeContext.Provider value={{}}>
			{children}
		</exchangeContext.Provider>
	)
}