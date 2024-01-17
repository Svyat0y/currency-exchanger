import styles from './infoTitle.module.scss'
import {FC} from "react"

type InfoTitleProps = {
	sendValue: number | string | null
	isPopup?: boolean
}

export const InfoTitle: FC<InfoTitleProps> = ({sendValue, isPopup}) => {
	return (
		<>
			<div className={styles.wrapper}>
				<p className={styles.title}>Send <span>{sendValue} usdt</span> to the address below</p>
				{!isPopup && <p className={styles.subTitle}>Waiting for your deposit...</p>}
			</div>
		</>
	)
}