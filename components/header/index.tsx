"use client"

import styles from './header.module.scss'
import {ExchangeInfo} from "@/components/header/exchangeInfo/exchangeInfo"
import classNames from "classnames"
import {Navigation} from "@/components/header/navigation/navigation"
import {Container} from "@/components/container"

export const Header = () => {
	return (
		<div className={classNames(styles.wrapper, styles.active)}>
			<Container>
				<div className={styles.headerContent}>
					<div className={styles.logo}>
						<span className={styles.logoTitle}>SwapHub</span>
						<span className={styles.logoDesc}>Crypto Exchange</span>
					</div>
					<ExchangeInfo/>
					<Navigation/>
				</div>
			</Container>
		</div>
	)
}