import styles from './menuCard.module.scss'
import classNames from "classnames"
import {FC} from "react"
import {CloseButton} from "@/components/buttons/closeButton"

type MenuCard = {
	isOpenMenu?: boolean
	handleCloseMenu: () => void
}

export const MenuCard: FC<MenuCard> = ({isOpenMenu, handleCloseMenu}) => {


	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: isOpenMenu
		})}>
			wrapper menu
			<CloseButton onClick={handleCloseMenu}/>
		</div>
	)
}