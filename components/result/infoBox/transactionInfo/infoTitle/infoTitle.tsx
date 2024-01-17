import styles from './infoTitle.module.scss'
import {FC, ReactNode} from "react"
import {TExchangeInfo} from "@/components/result/infoBox/infoBox"

type InfoTitleProps = {
	sendInfo?: TExchangeInfo
	isPopup?: boolean
	renderText: ReactNode
	subText?: string
}

export const InfoTitle: FC<InfoTitleProps> = (
	{
		isPopup,
		renderText,
		subText
	}) => {

	return (
		<>
			<div className={styles.wrapper}>
				<p className={styles.title}>{renderText}</p>
				{!isPopup && <p className={styles.subTitle}>{subText}</p>}
			</div>
		</>
	)
}