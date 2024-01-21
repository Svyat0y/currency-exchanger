import styles from './transactionFooter.module.scss'
import {SendValueBox} from "@/components/header/exchangeInfo/sendValueBox"
import {GetValueBox} from "@/components/header/exchangeInfo/getValueBox"

export const TransactionFooter = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.box}>
				<span className={styles.boxTitle}>You send</span>
				<SendValueBox/>
			</div>
			<div className={styles.box}>
				<span className={styles.boxTitle}>You get</span>
				<GetValueBox textColor={'black'} className={styles.getValueBox} noActive={true}/>
			</div>
		</div>
	)
}