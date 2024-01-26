import styles from './navigation.module.scss'
import Link from "next/link"
import {FC} from "react"
import classNames from "classnames"

type NavigationListProps = {
	isVisible : boolean
}

const NAV_LIST = [
	{id: 0, label: 'Exchange', link: '#'},
	{id: 1, label: 'FAQ', link: '#'},
	{id: 2, label: 'About', link: '#'},
]

export const NavigationList: FC<NavigationListProps> = ({isVisible}) => {

	return (
		<>
			<ul className={classNames(styles.navListWrapper, {[styles.isVisible]: isVisible})}>
				{NAV_LIST.map((item) => {
					return (
						<li key={item.id} className={styles.navItem}>
							<Link href={item.link}>{item.label}</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}