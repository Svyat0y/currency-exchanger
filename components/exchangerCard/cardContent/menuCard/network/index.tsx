import styles from './network.module.scss'
import {CustomButton} from "@/components/buttons/customButton"
import {FC} from "react"
import classNames from "classnames"
import {NetworkList} from "./networkList"
import {TListObj} from "@/components/exchangerCard/cardContent/menuCard"

type NetworkProps = {
	networkMenuIsOpen: boolean
	setNetworkMenuIsOpen: (state: boolean) => void
	selectedNetwork: TListObj
	setSelectedNetwork: (obj: TListObj) => void
}

export const Network: FC<NetworkProps> = (
	{
		networkMenuIsOpen,
		setNetworkMenuIsOpen,
		selectedNetwork,
		setSelectedNetwork
	}) => {

	return (
		<div className={classNames(styles.network, {
			[styles.isOpen]: networkMenuIsOpen
		})}>
			<span className={styles.title}>Tokens</span>
			<CustomButton
				onClick={() => setNetworkMenuIsOpen(true)}
				className={classNames(styles.networkBtn, styles.mainBtn)}
				text={selectedNetwork.label}
				icon='/icons/smallArrow.svg'
			/>
			<div className={classNames(styles.popup, {
				[styles.isOpen]: networkMenuIsOpen
			})}>
				<div className={styles.popupHeader}>
					<span className={styles.title}>Networks</span>
					<CustomButton
						onClick={() => setNetworkMenuIsOpen(false)}
						className={classNames(styles.networkBtn, styles.popupBtn)}
						text={selectedNetwork.label}
						icon='/icons/smallArrow.svg'
					/>
				</div>
				<NetworkList
					networkMenuIsOpen={networkMenuIsOpen}
					setNetworkMenuIsOpen={setNetworkMenuIsOpen}
					selectedNetwork={selectedNetwork}
					setSelectedNetwork={setSelectedNetwork}
				/>
			</div>
		</div>
	)
}