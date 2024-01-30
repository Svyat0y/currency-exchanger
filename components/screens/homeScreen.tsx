"use client"

import styles from "@/app/page.module.scss"
import {Container} from "@/components/container"
import {Exchanger} from "@/components/exchanger"
import {Result} from "@/components/result"
import {useContextStatus} from "@/context/statusContext"

export const HomeScreen = () => {
	const {currentStatus} = useContextStatus()

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.content}>
					<Exchanger animStart={!!currentStatus}/>
					<Result animStart={!!currentStatus}/>
				</div>
			</Container>
		</div>
	)
}