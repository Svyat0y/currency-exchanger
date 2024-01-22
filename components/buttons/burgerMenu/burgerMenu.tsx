import styles from './burgerMenu.module.scss'
import {FC, MutableRefObject} from "react"
import classNames from "classnames"

type BurgerMenuProps = {
	handleMenuOpen: () => void
	menuBtnRef: MutableRefObject<HTMLButtonElement | null>
	isOpenNavMenu: boolean
}

export const BurgerMenu: FC<BurgerMenuProps> = ({menuBtnRef, handleMenuOpen, isOpenNavMenu}) => {
	return (
		<button ref={menuBtnRef} onClick={handleMenuOpen} aria-label='burger menu' className={classNames(styles.burgerButton, {
			[styles.isOpen]: isOpenNavMenu
		})}>
			<span className={styles.burgerBox}></span>
			<span className={styles.burgerBox}></span>
			<span className={styles.burgerBox}></span>
			<span className={styles.burgerBox}></span>
		</button>

	)
}