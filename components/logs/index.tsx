import styles from './logs.module.scss'
import {LogItem} from "@/components/logs/logItem"
import {FC} from "react"

export type TLog = {
	id: number,
	time: string,
	status: string,
	desc: string
}

type LogsProps = {
	displayedLogs: TLog[]
	isAllSuccess: boolean
	confirmCount: number
}

export const Logs: FC<LogsProps> = ({displayedLogs}) => {

	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>Exchange logs</h5>
			<div className={styles.content}>
				{displayedLogs.map(log => (
					<LogItem key={log.id} log={log} active/>
				))}
			</div>
		</div>
	)
}