import React, {FC, useEffect} from "react"
import styles from './qrScanner.module.scss'
import {QrReader} from "react-qr-reader"
import {PrimaryButton} from "@/components/buttons/primaryButton"

type TQrCodeScanner = {
	setWallet: (value: string) => void
	setShowScanner: (b: boolean) => void
	showScanner: boolean
};

export const QrScanner: FC<TQrCodeScanner> = (
	{
		setWallet,
		setShowScanner,
		showScanner,
	}) => {

	useEffect(() => {
		if (showScanner) {
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.body.style.overflow = "auto"
		}
	}, [showScanner])

	const handleScanResult = (result: any, error: any) => {
		if (result) {
			setWallet(result.text)
			setShowScanner(false)
		}
		if (error) {
			console.info(error)
		}
	}

	const handleCloseScanner = () => {
		setShowScanner(false)
	}

	return (
		<div className={`${styles.overlay} ${showScanner ? styles.visible : null}`}>
			<div className={`${styles.container} ${styles.maxWidth}`}>
				<QrReader
					scanDelay={1000}
					constraints={{facingMode: "environment"}}
					onResult={handleScanResult}
				/>
				<PrimaryButton text={'Close Scanner'} onClick={handleCloseScanner} type="black"/>
			</div>
		</div>
	)
}
