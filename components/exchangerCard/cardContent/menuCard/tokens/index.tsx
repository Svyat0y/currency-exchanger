import React from 'react'
import styles from './tokens.module.scss'
import { currencies } from '@/components/exchanger/data'
import { TokenItem } from './tokenItem'
import { Item } from '@/types/types'
import { FC } from 'react'
import classNames from "classnames";

type TokensProps = {
	handleTokenItem: (item: Item) => void
	selectedNetwork: string
}

type VisibilityMap = Record<string, boolean>;

export const Tokens: FC<TokensProps> = ({ handleTokenItem, selectedNetwork }) => {
	const groupedCurrencies: Record<string, Item[]> = {}

	currencies.forEach((item) => {
		if (!groupedCurrencies[item.shortLabel]) {
			groupedCurrencies[item.shortLabel] = []
		}
		groupedCurrencies[item.shortLabel].push(item)
	})

	const visibilityMap: VisibilityMap = Object.entries(groupedCurrencies).reduce((acc, [shortLabel, items]) => {
		acc[shortLabel] = selectedNetwork === 'allNetworks' || items.some(item => item.networkValue === selectedNetwork)
		return acc;
	}, {} as VisibilityMap)

	const hasVisibleItems = Object.values(visibilityMap).some(isVisible => isVisible)

	if (!hasVisibleItems) {
		return <div className={styles.noItems}>No items</div>
	}

	return (
		<div className={styles.wrapper}>
			{Object.entries(groupedCurrencies).map(([shortLabel, items], groupIndex) => {
				const isVisible = visibilityMap[shortLabel]

				return (
					<div className={classNames(styles.group, {
						[styles.hidden]: !isVisible
					})} key={groupIndex}>
						{items.map((item, itemIndex) => (
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