import styles from './navigation.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {useRef, useState} from "react"
import classNames from "classnames"
import {useOnClickOutside} from "@/hooks/useOnClickOutside"
import {BurgerMenu} from "@/components/buttons/burgerMenu/burgerMenu"
import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {IconButton} from "@/components/buttons/iconButton/iconButton"

const THEMES = {
	light: 1,
	dark: 2
}

export const Navigation = () => {
	const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
	const menuRef = useRef<HTMLDivElement | null>(null)
	const menuBtnRef = useRef<HTMLButtonElement | null>(null)
	const [activeTheme, setActiveTheme] = useState(THEMES.light)
	const isLightTheme = activeTheme === THEMES.light
	const isDarkTheme = activeTheme === THEMES.dark

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
				<div className={styles.header}>
					<NavigationBox isBorder={false} className={classNames(styles.navBtns, {
						[styles.isCloseMenu]: !isOpenNavMenu,
					})}>
						<IconButton
							active={isOpenNavMenu && isLightTheme}
							onClick={() => setActiveTheme(THEMES.light)}
							disabled={!isOpenNavMenu}
							icon={'BLACK_SUN'}
							hided={!isLightTheme && !isOpenNavMenu}
							className={styles.navBtn}/>
						<IconButton
							active={isOpenNavMenu && isDarkTheme}
							onClick={() => setActiveTheme(THEMES.dark)}
							disabled={!isOpenNavMenu}
							icon={'MOON'}
							hided={!isDarkTheme && !isOpenNavMenu}
							className={styles.navBtn}/>
					</NavigationBox>
					<BurgerMenu menuBtnRef={menuBtnRef} handleMenuOpen={handleMenuOpen}/>
				</div>
			</div>
		</div>
	)
}