"use client"

import styles from './header.module.scss'
import {ExchangeInfo} from "@/components/header/exchangeInfo/exchangeInfo"
import classNames from "classnames"
import {Navigation} from "@/components/header/navigation/navigation"
import {Container} from "@/components/container"
import Link from "next/link"
import {useContextStatus} from "@/context/statusContext"

export const Header = () => {
	const {currentStatus} = useContextStatus()
	
	return (
		<div className={classNames(styles.wrapper, {[styles.active]: !!currentStatus})}>
			<Container>
				<div className={styles.headerContent}>
					<Link aria-label={'logo'} href={'/'} className={styles.logo}>
						<span className={styles.logoTitle}>SwapHub</span>
						<span className={styles.logoDesc}>Crypto Exchange</span>
					</Link>
					<ExchangeInfo/>
					<Navigation/>
				</div>
			</Container>
		</div>
	)
}