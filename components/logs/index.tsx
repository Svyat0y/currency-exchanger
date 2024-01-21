import styles from './logs.module.scss'
import {useEffect, useState} from "react"

export const Logs = ({confirmCount}: {confirmCount: number | undefined}) => {
	const [logIndex, setLogIndex] = useState(4)

	const LOGS = [
		{id: 0, time: '[12:21:05]', status: 'action', desc: 'CreateOrder 10 USDT to 0.000375 BTC'},
		{id: 1, time: '[12:21:05]', status: 'action', desc: 'LookingForTransaction'},
		{id: 2, time: '[12:21:05]', status: 'success', desc: 'Found 10 USDT, TX:0xba72b008d53d3e65f6641e1d63376be2f9c1ad05'},
		{id: 3, time: '[12:21:05]', status: 'action', desc: `Waiting for confirmations ${confirmCount || '10'}/10...`},
		{id: 4, time: '[12:21:05]', status: 'success', desc: 'AML check passed'},
		{id: 5, time: '[12:21:05]', status: 'action', desc: 'Withdrawing 0.000375 BTC...'},
		{id: 6, time: '[12:21:05]', status: 'success', desc: 'Withdrawal complete. TX:0xba72b008d53d3e65f6641e1d63376be2f9c1ad05'},
		{id: 7, time: '[12:21:05]', status: 'success', desc: 'Exchange completed'},
	]
	const [displayedLogs, setDisplayedLogs] = useState(LOGS.slice(0, 4))

	useEffect(() => {
		if (confirmCount && confirmCount >= 10) {
			const intervalId = setInterval(() => {
				if (logIndex < LOGS.length) {
					setDisplayedLogs(currentLogs => [...currentLogs, LOGS[logIndex]])
					setLogIndex(logIndex + 1)
				}
			}, 1000)

			return () => clearInterval(intervalId)
		}
	}, [confirmCount, logIndex])

	useEffect(() => {
		setDisplayedLogs(currentLogs => currentLogs.map(log => {
			if (log.id === 3) {
				return { ...log, desc: `Waiting for confirmations ${confirmCount}/10...` }
			}
			return log
		}))
	}, [confirmCount])


	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>Exchange logs</h5>
			<div className={styles.content}>
				{displayedLogs.map(log => (
					<div key={log.id}>
						{log.time} {log.status}: {log.desc}
					</div>
				))}
			</div>
		</div>
	)
}