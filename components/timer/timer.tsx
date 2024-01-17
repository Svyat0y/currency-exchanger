import styles from './timer.module.scss'

import React, { useState, useEffect } from 'react'
import {Icon} from "@/components/icon"
import classNames from "classnames"

type TimerProps = {
	initialMinutes: number
	icon?: string
	className?: string
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, icon, className }) => {
	const [time, setTime] = useState(initialMinutes * 60)

	useEffect(() => {
		// Если время не истекло, продолжаем отсчет
		const timer = time > 0 && setInterval(() => setTime(time - 1), 1000)

		// Очистка таймера
		return () => clearInterval(timer as NodeJS.Timeout)
	}, [time])

	// Форматирование времени для отображения
	const formatTime = () => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	};

	return (
		<div className={classNames(styles.wrapper, className)}>
			{icon && <Icon className={styles.icon} type={icon}/>}
			{formatTime()}
		</div>
	)
}

export default Timer
