import styles from "./tokens.module.scss"
import {Item} from "@/types/types"
import {FC} from "react"
import classNames from "classnames"

type ItemProps = {
	item: Item
	onClick: () => void
	isVisible?: boolean
}

export const TokenItem: FC<ItemProps> = ({item, onClick, isVisible}) => {

	return (
		<button className={classNames(styles.itemWrapper, {
			[styles.isVisible]: isVisible,
		})} onClick={onClick}>
			<div className={styles.left}>
				<div className={styles.imgWrapper}>
					<img src={item.icon} alt={item.label}/>
				</div>
				<div className={styles.labels}>
					<p className={styles.short}>{item.shortLabel}</p>
					<p className={styles.label}>{item.label}</p>
				</div>
			</div>
			<div className={styles.right}>
				<p>{item.network}</p>
			</div>
		</button>
	)
}