import styles from './network.module.scss'
import classNames from "classnames"
import {FC} from "react"
import {Item} from "./item"
import {LIST} from "@/components/exchangerCard/cardContent/menuCard"
const check = '/icons/check.svg'

type NetworkListProps = {
	networkMenuIsOpen: boolean
	setNetworkMenuIsOpen: (state: boolean) => void
	selectedNetwork: string
	setSelectedNetwork: (value: string) => void
}

export const NetworkList: FC<NetworkListProps> = (
	{networkMenuIsOpen,
		setNetworkMenuIsOpen, selectedNetwork,
		setSelectedNetwork,
	}) => {

	const handleNetwork = (value: string) => {
		setSelectedNetwork(value)
		setNetworkMenuIsOpen(false)
	}

	return (
		<div className={classNames(styles.networkList, {
			[styles.isOpen]: networkMenuIsOpen,
		})}>
			{LIST.map(el => {
				return (
					<Item
						key={el.value}
						el={el}
						icon={check}
						active={selectedNetwork === el.value}
						handleNetwork={handleNetwork}
					/>
				)
			})}
		</div>
	)
}