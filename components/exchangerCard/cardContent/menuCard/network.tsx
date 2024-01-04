import styles from './menuCard.module.scss'
import {CustomButton} from "@/components/buttons/customButton"
import {FC} from "react"
import classNames from "classnames"
import {GradientBorder} from "@/components/gradientBorder"
import {NetworkList} from "@/components/exchangerCard/cardContent/menuCard/networkList"

type NetworkProps = {
	networkMenuIsOpen: boolean
	setNetworkMenuIsOpen: (state: boolean) => void
	selectedNetwork: string
	setSelectedNetwork: (value: string) => void
}

export const Network: FC<NetworkProps> = (
	{networkMenuIsOpen,
		setNetworkMenuIsOpen,
		selectedNetwork,
		setSelectedNetwork
	}) => {

	return (
		<div className={classNames(styles.network)}>
			<div className={classNames(styles.content)}>
					<span className={classNames(styles.leftTitle, {
						[styles.isOpen]: networkMenuIsOpen,
					})}>Tokens</span>
				<div className={classNames(styles.nav, {
					[styles.isOpen]: networkMenuIsOpen,
				})}>
					<div className={classNames(styles.borderWrapper, {
						[styles.isOpen]: networkMenuIsOpen,
					})}>
						<GradientBorder smallRadius={true} active={true} withoutAnim={true} withoutGrayBorder/>
					</div>
					<div className={classNames(styles.navContent, {
						[styles.isOpen]: networkMenuIsOpen,
					})}>
						<div className={styles.navHeader}>
							<span className={styles.leftTitlePopup}>Networks</span>
							<CustomButton
								onClick={() => setNetworkMenuIsOpen(!networkMenuIsOpen)}
								className={styles.networkBtn}
								text='All Networks'
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
			</div>
		</div>
	)
}