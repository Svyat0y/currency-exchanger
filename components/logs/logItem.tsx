import styles from './logs.module.scss'
import classNames from "classnames"
import {FC, useEffect, useRef, useState} from "react"
import {TLog} from "@/components/logs/index"

type LogItemProps = {
	log: TLog
	active: boolean
}

export const LogItem: FC<LogItemProps> = ({log, active}) => {
	const [fadeIn, setFadeIn] = useState(false)
	const [maxHeight, setMaxHeight] = useState('0px')
	const itemRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		let timeOut: any

		if(active) {
			timeOut = setTimeout(() => {
				setFadeIn(true)
			}, 100)
		}

		if (active && itemRef?.current) {
			const itemHeight = itemRef?.current?.scrollHeight
			setMaxHeight(`${itemHeight}px`)
		} else {
			setMaxHeight('0px')
		}

		return () =>{
			clearTimeout(timeOut)
		}
	}, [active, itemRef?.current])

	return (
		<div ref={itemRef} className={classNames(styles.logItem, {
			[styles.active]: fadeIn
		})} style={{maxHeight: maxHeight}}>
			<span className={styles.time}>{log.time}</span>
			<span className={classNames(styles.status, styles[log.status])}>{log.status}:</span>
			<span className={classNames(styles.desc, {
				[styles.success]: log.desc === 'Exchange completed'
			})}>{log.desc}</span>
		</div>
	)
}