import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'

type TStatusContext = {
	children: ReactNode
}

type TStatuses = {
	states: Array<{
		id: number
		title: string
		state: string
	}>;
	setStates: React.Dispatch<React.SetStateAction<any>>
	updateState?: (title: string, newState: string) => void
	isExchangeStarted: boolean
}

export const WAITING_STATUSES = {
	deposit: 'deposited',
	confirmations: 'confirming',
	exchange: 'exchanging',
}

export const STATUS = {
	initial: 'initial',
	loading: 'loading',
	success: 'success',
}


export const statesDate = [
	{
		id: 0,
		title: WAITING_STATUSES.deposit,
		state: STATUS.initial
	},
	{
		id: 1,
		title: WAITING_STATUSES.confirmations,
		state: STATUS.initial
	},
	{
		id: 2,
		title: WAITING_STATUSES.exchange,
		state: STATUS.initial
	}
]


const statusContext = createContext<TStatuses | null>(null)

export const useContextStatus = () => {
	const context = useContext(statusContext)
	if (!context) {
		throw new Error("StatusContextProvider must be used within a StatusContextProvider")
	}
	return context
}

export const StatusContextProvider = ({children}: TStatusContext) => {
	const [states, setStates] = useState<Array<{ id: number, title: string, state: string }>>([])
	const isExchangeStarted = states.some(obj => obj.state === STATUS.loading)

	// for saving the status after refreshing page
	useEffect(() => {
		const savedStates = JSON.parse(localStorage.getItem('states') || 'null')
		if (savedStates) {
			setStates(savedStates)
		}
		else {
			setStates(statesDate)
		}
	}, [])

	const updateState = (title: string, newState: string) => {
		const newStates = states?.length ? [...states] : [...statesDate]
		const indexId = newStates.find(s => s.title === title)?.id || 0

		//update previous state on success
		newStates.map((state, index) => {

			if (state.state === STATUS.loading) {
				newStates[index].state = STATUS.success
				setStates(newStates)
			}
		})

		//update current state
		newStates[indexId].state = newState
		setStates(newStates)
		localStorage.setItem('states', JSON.stringify(newStates))

		if(title === WAITING_STATUSES.exchange && newState === STATUS.success) {
			localStorage.removeItem('states')
		}
	}

	const value = {
		states,
		setStates,
		updateState,
		isExchangeStarted,
	}

	return (
		<statusContext.Provider value={value}>
			{children}
		</statusContext.Provider>
	)
}
