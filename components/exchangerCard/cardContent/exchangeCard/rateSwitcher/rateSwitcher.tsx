import styles from './rateSwitcher.module.scss'
import {NavigationBox} from "@/components/navigationBox/navigationBox"
import classNames from "classnames"
import {Icon} from "@/components/icon"
import {useState} from "react"

const RATES = {
	floating: 1,
	fixed: 2
}

export const RateSwitcher = () => {
	const [rateState, setRateState] = useState(1)

	return (
		<div className={styles.cardNav}>

			<NavigationBox isShadow={false}>
				<button onClick={() => setRateState(RATES.floating)} className={classNames(styles.navBtn, {
					[styles.active]: rateState === RATES.floating
				})}>
					<Icon type='WATER'/>
				</button>
				<button onClick={() => setRateState(RATES.fixed)} className={classNames(styles.navBtn, {
					[styles.active]: rateState === RATES.fixed
				})}>
					<Icon type='LOCK' fill={'rgba(0, 0, 0, .3)'}/>
				</button>
			</NavigationBox>

		</div>
	)
}