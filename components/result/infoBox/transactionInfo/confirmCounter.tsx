import {useEffect, useState} from "react"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"

export const ConfirmCounter = ({interval}: {interval: number}) => {
	const [count, setCount] = useState(1)
	const {updateState} = useContextStatus()

	useEffect(() => {
		if (count >= 10) {
			updateState && updateState(WAITING_STATUSES.exchange, STATUS.loading)
			return
		}

		const intervalId = setInterval(() => {
			setCount((prevCount) => prevCount + 1)
		}, interval)

		return () => clearInterval(intervalId)
	}, [count])

	return <span>Confirmations {count} / 10</span>
}