"use client"

import styles from './homeScreen.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Result} from "@/components/result"
import {useContextStatus} from "@/context/statusContext"
import {useEffect, useState} from "react"
import {ANIMATION_TIME} from "@/app/const"


export const HomeScreen = () => {
	const {currentStatus} = useContextStatus()
	const [isShowRightBox, setIsShowRightBox] = useState(false)

	useEffect(() => {
		let resizeTimer: number

		const updateHeaderHeight = () => {
			const headerElement = document.getElementById('header')
			if (headerElement) {
				const headerHeight = headerElement.offsetHeight
				document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
			}
		};

		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = window.setTimeout(updateHeaderHeight, ANIMATION_TIME) as number
		};

		const initialTimer = window.setTimeout(updateHeaderHeight, ANIMATION_TIME) as number

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			clearTimeout(resizeTimer)
			clearTimeout(initialTimer)
		};
	}, [currentStatus])




	return (
		<div className={styles.wrapper} id={'wrapper'}>
			<Exchanger animStart={!!currentStatus}/>
			<Result animStart={!!currentStatus} setIsShowRightBox={setIsShowRightBox} isShowRightBox={isShowRightBox}/>
		</div>
	)
}