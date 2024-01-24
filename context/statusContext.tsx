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
	isAnyStatusActive: boolean
	currentStatus: string
	setCurrentStatus: (state: string) => void
}

export const WAITING_STATUSES = {
	deposit: 'deposited',
	confirmations: 'confirming',
	exchange: 'exchanging',
	resetting: 'resetting',
}

export const STATUS = {
	initial: 'initial',
	loading: 'loading',
	success: 'success',
	reset: 'reset',
} as const


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
	const isAnyStatusActive = states?.some(obj => obj.state !== STATUS.initial)
	const [currentStatus, setCurrentStatus] = useState('')

	// for saving the status after refreshing page
	useEffect(() => {
		const savedStates = JSON.parse(localStorage.getItem('states') || 'null')
		const currentStatus = localStorage.getItem('currentStatus') || ''

		if(currentStatus === STATUS.success) {
			setStates(statesDate)
			setCurrentStatus('')
		}
		else {
			setStates(savedStates)
			setCurrentStatus(currentStatus)
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
		localStorage.setItem('currentStatus', title)
		setCurrentStatus(title)

		if(title === WAITING_STATUSES.exchange && newState === STATUS.success) {
			localStorage.setItem('currentStatus', 'success')
			setCurrentStatus('success')
		}

		if(title === WAITING_STATUSES.resetting && newState === STATUS.reset) {
			localStorage.removeItem('states')
			localStorage.removeItem('cardsValue')
			localStorage.removeItem('currentStatus')
			setStates([])
			setCurrentStatus('')
		}

	}

	const value = {
		states,
		setStates,
		updateState,
		isAnyStatusActive,
		setCurrentStatus,
		currentStatus
	}

	return (
		<statusContext.Provider value={value}>
			{children}
		</statusContext.Provider>
	)
}
