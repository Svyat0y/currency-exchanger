import styles from './tRexGame.module.scss'
import {GradientBorder} from "@/components/gradientBorder"

export const TRexGame = () => {
	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>Play to Win</h5>
			<div className={styles.borderWrapper}>
				<GradientBorder active={false}/>
				<div className={styles.content}></div>
			</div>
		</div>
	)
}