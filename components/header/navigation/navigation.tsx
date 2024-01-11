import styles from './navigation.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {Icon} from "@/components/icon"
import {useRef, useState} from "react"
import classNames from "classnames"
import {useOnClickOutside} from "@/hooks/useOnClickOutside"

export const Navigation = () => {
	const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
	const menuRef = useRef<HTMLDivElement | null>(null)
	const menuBtnRef = useRef<HTMLButtonElement | null>(null)

	const handleMenuOpen = () => {
		setIsOpenNavMenu(true)
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
				<NavigationBox isBorder={!isOpenNavMenu} isShadow={!isOpenNavMenu} className={`${styles.navMenu}`}>
					<button aria-label='black sun' className={styles.navBtn}>
						<Icon type='BLACK_SUN'/>
					</button>
					<button ref={menuBtnRef} onClick={handleMenuOpen} aria-label='burger menu' className={styles.navBtn}>
						<Icon type='BURGER_MENU'/>
					</button>
				</NavigationBox>
			</div>
		</div>
	)
}