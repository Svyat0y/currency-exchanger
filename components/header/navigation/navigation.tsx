import styles from './navigation.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {Icon} from "@/components/icon"
import {useRef, useState} from "react"
import classNames from "classnames"
import {useOnClickOutside} from "@/hooks/useOnClickOutside"

export const Navigation = () => {
	const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
	const menuRef = useRef<HTMLDivElement | null>(null)
	const menuBtnRef = useRef<HTMLButtonElement | null>(null)

	const handleMenuOpen = () => {
		setIsOpenNavMenu(!isOpenNavMenu)
	}

	const handleMenuClose = () => {
		setIsOpenNavMenu(false)
	}

	useOnClickOutside(menuRef, handleMenuClose, undefined, menuBtnRef)

	return (
		<div ref={menuRef} className={classNames(styles.wrapper, {
			[styles.isOpen]: isOpenNavMenu
		})}>
			<GradientBorder className={styles.gradientBorder} withoutAnim active={isOpenNavMenu} borderRadius={13}/>
			<div className={classNames(styles.content)}>
				<span aria-label='black sun' className={styles.themeInfo}>
					<Icon type='BLACK_SUN'/>
				</span>
				<button ref={menuBtnRef} onClick={handleMenuOpen} aria-label='burger menu' className={styles.navIcon}>
					<Icon type='BURGER_MENU'/>
				</button>
			</div>
		</div>
	)
}