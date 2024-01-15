import React, {createContext, ReactNode, useContext, useState} from 'react'

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
}

export const WAITING_STATUSES = {
	deposit: 'waiting for deposit',
	confirmations: 'waiting for confirmations',
	withdraw: 'withdraw to you',
}

export const STATUS = {
	initial: 'initial',
	loading: 'loading',
	success: 'success',
}


const statesDate = [
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
		title: WAITING_STATUSES.withdraw,
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
	const savedStates = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('states') || 'null') : null
	const [states, setStates] = useState(savedStates)

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

		if(title === WAITING_STATUSES.withdraw && newState === STATUS.success) {
			localStorage.removeItem('states')
		}
	}


	const value = {
		states,
		setStates,
		updateState,
		savedStates,
	}

	return (
		<statusContext.Provider value={value}>
			{children}
		</statusContext.Provider>
	)
}
