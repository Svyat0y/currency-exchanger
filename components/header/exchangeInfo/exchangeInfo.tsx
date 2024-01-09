import styles from './exchangeInfo.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"

export const ExchangeInfo = () => {
	return (
		<div className={classNames(styles.exchangeInfo, styles.active)}>
			<div className={styles.left}>
				<div className={styles.box}>
					icon
					<span>10 usdt</span>
				</div>
				<div className={styles.box}>
					<span>price</span>
					icon
				</div>
			</div>
			<button aria-label='rate button' className={styles.rateBox}>
				<Icon type='LOCK' fill={'rgba(0, 0, 0, .3)'} />
			</button>
		</div>
	)
}