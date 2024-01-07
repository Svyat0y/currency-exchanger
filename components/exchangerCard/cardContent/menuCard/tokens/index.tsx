import React from 'react'
import styles from './tokens.module.scss'
import { currencies } from '@/components/exchanger/data'
import { TokenItem } from './tokenItem'
import { Item } from '@/types/types'
import { FC } from 'react'
import classNames from "classnames"
import {TListObj} from "@/components/exchangerCard/cardContent/menuCard"

type TokensProps = {
	handleTokenItem: (item: Item) => void
	selectedNetwork: TListObj
	searchInput: string
	className: string
}

export const Tokens: FC<TokensProps> = ({ handleTokenItem, selectedNetwork, searchInput, className }) => {
	const groupedCurrencies: Record<string, Item[]> = {}

	currencies.forEach((item) => {
		if (!groupedCurrencies[item.shortLabel]) {
			groupedCurrencies[item.shortLabel] = []
		}
		groupedCurrencies[item.shortLabel].push(item)
	})

	const visibilityMap: Record<string, Item[]> = Object.entries(groupedCurrencies).reduce<Record<string, Item[]>>((acc, [shortLabel, items]) => {
		acc[shortLabel] = items.filter(item =>
			(selectedNetwork.value === 'allNetworks' || item.networkValue === selectedNetwork.value) &&
			(!searchInput || (
				item.label.toLowerCase().includes(searchInput.toLowerCase())) ||
				item.shortLabel.toLowerCase().includes(searchInput.toLowerCase())
			)
		);
		return acc
	}, {})


	const hasVisibleItems = Object.values(visibilityMap).some(group => group.length > 0)

	if (!hasVisibleItems) {
		return <div className={styles.noItems}>No items</div>
	}

	return (
		<div className={classNames(styles.wrapper, className)}>
			{Object.entries(visibilityMap).map(([shortLabel, visibleItems], groupIndex) => {
				const isVisible = visibleItems.length > 0

				return (
					<div className={classNames(styles.group, { [styles.hidden]: !isVisible })} key={groupIndex}>
						{visibleItems.map((item, itemIndex) => (
							<React.Fragment key={itemIndex}>
								<TokenItem
									isVisible={isVisible}
									item={item}
									onClick={() => handleTokenItem(item)}
								/>
							</React.Fragment>
						))}
						<span className={styles.groupSeparator}/>
					</div>
				)
			})}
		</div>
	)
}
