import styles from './popupHeader.module.scss'
import {PrimaryButton} from "@/components/buttons/primaryButton"
import classNames from "classnames"
import {TABS} from "../popupContent"
import {FC} from "react"

type PopupHeaderProps = {
	handleClickAddress: () => void
	handleClickAmount: () => void
	activeTab: number
}

export const PopupHeader: FC<PopupHeaderProps> = ({handleClickAddress, handleClickAmount, activeTab}) => {

	return (
		<>
		<div className={styles.wrapper}>
			<PrimaryButton
				onClick={handleClickAddress}
				type='gray'
				text='QR address'
				className={classNames(styles.addressBtn, {[styles.active]: activeTab === TABS.qrAddress})}
			/>
			<PrimaryButton
				onClick={handleClickAmount}
				type='transparent'
				text='QR with amount'
				className={classNames(styles.amountBtn, {[styles.active]: activeTab === TABS.qrAmount})}
			/>
		</div>
			</>
	)
}