import styles from './menuCard.module.scss'
import classNames from "classnames"
import {FC, useEffect, useRef, useState} from "react"
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
	setPopupIsOpen: (state: boolean) => void
	popupIsOpen: boolean
}

export type TListObj = Record<string, string>

type TList = TListObj[]

export const LIST: TList = [
	{value: 'allNetworks', label: 'All networks', icon: ''},
	{value: 'ethereumErc20', label: 'Ethereum ERC 20', icon: ethIcon},
	{value: 'polygon', label: 'Polygon', icon: polygonIcon},
	{value: 'tronTrc20', label: 'Tron TRC 20', icon: tronIcon},
]

export const MenuCard: FC<MenuCard> = ({isOpenMenu, handleCloseMenu, setItem, setPopupIsOpen, popupIsOpen}) => {
	const [searchInput, setSearchInput] = useState('')
	const [networkMenuIsOpen, setNetworkMenuIsOpen] = useState(false)
	const [selectedNetwork, setSelectedNetwork] = useState(LIST[0])
	const wrapperRef = useRef<HTMLDivElement>(null)

	const selectedTokens = currencies.filter((token) => (
		token.value === 'BTC' && token.network === 'BNB BEP20' ||
		token.value === 'MATIC' && token.network === 'Polygon' ||
		token.value === 'ETH' && token.network === ''
	))

	useEffect(() => {
		if (wrapperRef?.current) {
			const buttons = wrapperRef.current.querySelectorAll('button')

			buttons.forEach((button: HTMLButtonElement) => {
				if (isOpenMenu) {
					button.removeAttribute('tabindex')
				} else {
					button.setAttribute('tabindex', '-1')
				}
			});
		}
	}, [isOpenMenu])

	useEffect(() => {
		if(networkMenuIsOpen) setPopupIsOpen(true)
		else setPopupIsOpen(false)
	}, [networkMenuIsOpen])

	const handleChangeInput = (value: string) => {
		setSearchInput(value)
	}

	const handlePopularItem = (item: Item) => {
		setItem(item)
		handleCloseMenu()
	}

	const handleTokenItem = (item: Item) => {
		setItem(item)
		handleCloseMenu()
		setSearchInput('')
	}

	return (
		<div ref={wrapperRef} className={classNames(styles.wrapper, {
			[styles.active]: isOpenMenu,
			[styles.noScroll]: networkMenuIsOpen,
		})}>
			<div className={classNames(styles.header, {
				[styles.noActive]: popupIsOpen,
			})}>
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
			<Search className={classNames({
				[styles.noActive]: popupIsOpen,
			})} searchInput={searchInput} handleChangeInput={handleChangeInput}/>
			<Network
				setNetworkMenuIsOpen={setNetworkMenuIsOpen}
				networkMenuIsOpen={networkMenuIsOpen}
				selectedNetwork={selectedNetwork}
				setSelectedNetwork={setSelectedNetwork}
			/>
			<Tokens
				className={classNames({
					[styles.noActive]: popupIsOpen,
				})}
				handleTokenItem={handleTokenItem}
				selectedNetwork={selectedNetwork}
				searchInput={searchInput}
			/>
		</div>
	)
}