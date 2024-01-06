import styles from './menuCard.module.scss'
import classNames from "classnames"
import {FC, useState} from "react"
import {CloseButton} from "@/components/buttons/closeButton"
import {currencies} from "@/components/exchanger/data"
import {CustomButton} from "@/components/buttons/customButton"
import {Item} from "@/types/types"
import {Search} from "@/components/search"
import {Network} from "./network"
import {Tokens} from "@/components/exchangerCard/cardContent/menuCard/tokens"

const ethIcon = '/icons/eth.svg'
const polygonIcon = '/icons/polygon.svg'
const tronIcon = '/icons/tron.svg'

type MenuCard = {
	isOpenMenu?: boolean
	handleCloseMenu: () => void
	setItem: (item: Item) => void
}

export const LIST = [
	{value: 'allNetworks', label: 'All networks', icon: ''},
	{value: 'ethereumErc20', label: 'Ethereum ERC 20', icon: ethIcon},
	{value: 'tronTrc20', label: 'Tron TRC 20', icon: tronIcon},
	{value: 'polygon', label: 'Polygon', icon: polygonIcon},
	{value: 'polygon', label: 'Polygon', icon: polygonIcon},
	{value: 'polygon', label: 'Polygon', icon: polygonIcon},
]

export const MenuCard: FC<MenuCard> = ({isOpenMenu, handleCloseMenu, setItem}) => {
	const [searchInput, setSearchInput] = useState('')
	const [networkMenuIsOpen, setNetworkMenuIsOpen] = useState(false)
	const [selectedNetwork, setSelectedNetwork] = useState(LIST[0].value)

	const selectedTokens = currencies.filter((token) => (
		token.id === 1 && token.value === 'BTC' && token.network === 'BNB BEP20' ||
		token.id === 1 && token.value === 'MATIC' && token.network === 'Polygon' ||
		token.id === 1 && token.value === 'ETH' && token.network === ''
	))

	const handlePopularItem = (item: Item) => {
		setItem(item)
		handleCloseMenu()
	}

	const handleTokenItem = (item: Item) => {
		setItem(item)
		handleCloseMenu()
	}

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: isOpenMenu
		})}>
			<div className={styles.header}>
				<div className={styles.top}>
					<span className={styles.left}>Select a token</span>
					<CloseButton onClick={handleCloseMenu} className={styles.closeBtn}/>
				</div>
				<div className={styles.tokens}>
					{selectedTokens.map((item) => {
						return (
							<CustomButton
								key={item.shortLabel}
								text={item.shortLabel}
								icon={item.icon}
								onClick={() => handlePopularItem(item)}
							/>
						)
					})}
				</div>
			</div>
			<Search searchInput={searchInput} handleChangeInput={setSearchInput}/>
			<Network
				setNetworkMenuIsOpen={setNetworkMenuIsOpen}
				networkMenuIsOpen={networkMenuIsOpen}
				selectedNetwork={selectedNetwork}
				setSelectedNetwork={setSelectedNetwork}
			/>
			<Tokens handleTokenItem={handleTokenItem} selectedNetwork={selectedNetwork}/>
		</div>
	)
}