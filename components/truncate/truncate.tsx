import styles from './truncate.module.scss'
import classNames from "classnames"

export const Truncate = ({walletAddress ,className}: {walletAddress: string, className: string}) => {
	return (
		<div className={classNames(styles.wrapper, className)}>
			<div className={styles.truncateWrapper}>
				<span className='truncate'>{walletAddress}</span>
			</div>
			<span>{String(walletAddress).slice(-3)}</span>
		</div>
	)
}