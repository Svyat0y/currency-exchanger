import {FC, useState} from "react"
import styles from './navigation.module.scss'
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {PrimaryAnimButton} from "@/components/buttons/primaryAnimButton/primaryAnimButton"

type NavigationProps = {
	walletAddress: number | string | null
	setPopupIsOpen: (state: boolean) => void
}

export const Navigation: FC<NavigationProps> = ({walletAddress, setPopupIsOpen}) => {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopyWallet =  async () => {
		try {
			await navigator.clipboard.writeText(String(walletAddress))
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 5000)
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}

	const handleOpenPopup = () => {
		setPopupIsOpen(true)
	}

	return (
		<div className={styles.wrapper}>
			<PrimaryAnimButton onClick={handleCopyWallet} icon={'CHECK'} state={isCopied} firstLabel='Coppy address' secondLabel='Copied'/>
			<IconButton onClick={handleOpenPopup} active={false} icon={'QR_CODE_LARGE'} className={styles.qrBtn}/>
		</div>
	)
}