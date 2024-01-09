import styles from './header.module.scss'
import {NavigationBox} from "@/components/navigationBox/navigationBox"
import {Icon} from "@/components/icon"
import {LargeContainer} from "@/components/container/largeContainer"
import {ExchangeInfo} from "@/components/header/exchangeInfo/exchangeInfo"
import classNames from "classnames"

export const Header = () => {
	return (
		<div className={classNames(styles.wrapper, styles.active)}>
			<LargeContainer>
				<div className={styles.headerContent}>
					<div className={styles.logo}>
						<span className={styles.logoTitle}>SwapHub</span>
						<span className={styles.logoDesc}>Crypto Exchange</span>
					</div>
					<ExchangeInfo/>
					<NavigationBox>
						<button aria-label='black sun' className={styles.navBtn}>
							<Icon type='BLACK_SUN'/>
						</button>
						<button aria-label='burger menu' className={styles.navBtn}>
							<Icon type='BURGER_MENU'/>
						</button>
					</NavigationBox>
				</div>
			</LargeContainer>
		</div>
	)
}