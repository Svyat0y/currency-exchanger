"use client"

import styles from './homeScreen.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Result} from "@/components/result"
import {useContextStatus} from "@/context/statusContext"
import {useState} from "react"


export const HomeScreen = () => {
	const {currentStatus} = useContextStatus()
	const [isShowRightBox, setIsShowRightBox] = useState(false)


	return (
		<div className={styles.wrapper} id={'wrapper'}>
			<Exchanger animStart={!!currentStatus}/>
			<Result animStart={!!currentStatus} setIsShowRightBox={setIsShowRightBox} isShowRightBox={isShowRightBox}/>
		</div>
	)
}