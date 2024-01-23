import {FC, useState} from "react"
import styles from './navigation.module.scss'
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {PrimaryAnimButton} from "@/components/buttons/primaryAnimButton/primaryAnimButton"

type NavigationProps = {
	walletAddress: number | string | null
	isCopied: boolean
	handleCopyWallet: () => void
	handleOpenPopup: () => void
}

export const Navigation: FC<NavigationProps> = ({handleOpenPopup, isCopied, handleCopyWallet}) => {

	return (
		<div className={styles.wrapper}>
			<PrimaryAnimButton onClick={handleCopyWallet} icon={'CHECK'} state={isCopied} firstLabel='Copy address' secondLabel='Copied'/>
			<IconButton onClick={handleOpenPopup} active={false} icon={'QR_CODE_LARGE'} className={styles.qrBtn}/>
		</div>
	)
}