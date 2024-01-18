import styles from './timer.module.scss'

import React, { useState, useEffect } from 'react'
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {formatTime} from "@/utils/helpers"
import {useMount} from "@/hooks/useMount"

type TimerProps = {
	initialMinutes: number
	icon?: string
	className?: string
	active: boolean
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, icon, className, active }) => {
	const [time, setTime] = useState(initialMinutes * 60)
	const {mounted} = useMount(active)

	useEffect(() => {
		const timer = time > 0 && setInterval(() => setTime(time - 1), 1000)

		return () => clearInterval(timer as NodeJS.Timeout)
	}, [time])

	if(!active && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, className, {
			[styles.active]: active
		})}>
			{icon && <Icon className={styles.icon} type={icon}/>}
			{formatTime(time)}
		</div>
	)
}

export default Timer
