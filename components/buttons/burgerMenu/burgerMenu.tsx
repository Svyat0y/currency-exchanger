import styles from './burgerMenu.module.scss'
import {Icon} from "@/components/icon"
import {FC, MutableRefObject} from "react"

type BurgerMenuProps = {
	handleMenuOpen: () => void
	menuBtnRef: MutableRefObject<HTMLButtonElement | null>
}

export const BurgerMenu: FC<BurgerMenuProps> = ({menuBtnRef, handleMenuOpen}) => {
	return (
		<button ref={menuBtnRef} onClick={handleMenuOpen} aria-label='burger menu' className={styles.wrapper}>
			<Icon type='BURGER_MENU'/>
		</button>
	)
}