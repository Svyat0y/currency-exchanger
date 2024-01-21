import styles from './transactions.module.scss'
import classNames from "classnames"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {useState} from "react"
import {TransactionFooter} from "@/components/transactions/footer/transactionFooter"

export const Transactions = () => {
	const [isCopied, setIsCopied] = useState(false)

	const BOXES = [
		{id: 0, title: 'Transaction ID', subTitle: 'qhkvmihj6hzrad7q', icon: 'COPY'},
		{id: 1, title: 'Exchange Rate', subTitle: '1 USDT ~ 0.000023 BTC'},
		{id: 2, title: 'Service fee', subTitle: '0.000023 BTC'},
		{id: 3, title: 'Network fee', subTitle: '0.000023 BTC'},
		{id: 4, title: 'Recipient address', subTitle: '0xba72b008d53d3e65f6641e1d63376be2f9c1ad05'},
	]

	const handleCopyWallet = async (value: string) => {
		try {
			await navigator.clipboard.writeText(String(value))
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 5000)
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}

	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>Transaction Details</h5>
			<div className={styles.content}>
				{BOXES.map(item => {
					return (
						<div key={item.id} className={classNames(styles.box, {
							[styles.walletBox]: item.title === 'Recipient address'
						})}>
							<span className={styles.boxTitle}>{item.title}</span>
							<div className={styles.subTitle}>
								<span className={styles.subTitleText} title={item.subTitle}>{item.subTitle}</span>
								{item?.icon &&
                  <IconButton
                    onClick={() => handleCopyWallet(item.subTitle)}
                    className={classNames(styles.iconWrapper, {
											[styles.copied]: isCopied
										})}
                    icon={!isCopied ? item.icon : 'CHECK'}
                    active={false}/>
								}
							</div>
						</div>
					)
				})}
			</div>
			<TransactionFooter/>
		</div>
	)
}