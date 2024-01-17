import {FC, useState} from "react"
import styles from './navigation.module.scss'
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {PrimaryAnimButton} from "@/components/buttons/primaryAnimButton/primaryAnimButton"

type NavigationProps = {
	walletAddress: number | string | null
}

export const Navigation: FC<NavigationProps> = ({walletAddress}) => {
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

	return (
		<div className={styles.wrapper}>
			<PrimaryAnimButton onClick={handleCopyWallet} icon={'CHECK'} state={isCopied} firstLabel='Coppy address' secondLabel='Copied'/>
			<IconButton active={false} icon={'QR_CODE_LARGE'} className={styles.qrBtn}/>
		</div>
	)
}