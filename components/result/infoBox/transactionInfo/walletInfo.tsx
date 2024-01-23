import {FC, useState} from "react"
import styles from "./transactionInfo.module.scss"
import {Truncate} from "@/components/truncate/truncate"
import {Navigation} from "./navigation/navigation"

type WalletInfoProps = {
	walletAddress: string
	setPopupIsOpen: (state: boolean) => void
}

export const WalletInfo: FC<WalletInfoProps> = ({walletAddress, setPopupIsOpen}) => {
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
		<>
			<button onClick={handleCopyWallet} disabled={isCopied} className={styles.walletBtn}>
				<Truncate className={styles.walletWrapper} text={walletAddress}/>
			</button>
			<Navigation walletAddress={walletAddress} handleOpenPopup={handleOpenPopup} handleCopyWallet={handleCopyWallet} isCopied={isCopied}/>
		</>
	)
}