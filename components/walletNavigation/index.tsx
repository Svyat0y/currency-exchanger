import styles from './walletNavigation.module.scss'
import {Icon} from "@/components/icon"
import {FC, useState} from "react"
import {createPortal} from "react-dom"
import {QrScanner} from "@/components/qrScanner"
import {NavigationBox} from "@/components/navigationBox/navigationBox"


type WalletNavigationProps = {
	setWallet: (wallet: string) => void
}

export const WalletNavigation: FC<WalletNavigationProps> = ({setWallet}) => {
	const [showScanner, setShowScanner] = useState(false)

	const handlePaste = async () => {
		if (!navigator.clipboard) {
			console.warn('Clipboard API not supported in this browser')
			return
		}

		try {
			const text = await navigator.clipboard.readText()
			setWallet(text)
		} catch (err) {
			console.error('Failed to read clipboard:', err)
		}
	}

	return (
		<>
			<div className={styles.wrapper}>
				<NavigationBox className={styles.wallet}>
					<button onClick={handlePaste} className={styles.navBtn}>
						<Icon type='PASTE'/>
					</button>
					<button onClick={() => setShowScanner(true)} className={styles.navBtn}>
						<Icon type='QR_CODE'/>
					</button>
				</NavigationBox>
			</div>
			{typeof document !== 'undefined' && showScanner && createPortal(
				<QrScanner showScanner={showScanner} setShowScanner={setShowScanner} setWallet={setWallet}/>,
				document.body)
			}
		</>
	)
}