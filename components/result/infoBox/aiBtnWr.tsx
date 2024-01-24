import styles from './infoBox.module.scss'
import classNames from "classnames"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"
import {Portal} from "@/components/portal"

type AiBtnWr = {
	handleOpenRightBox: () => void
	active: boolean
	positionFixedBtn: { top: number | null }
}

export const AiBtnWr: FC<AiBtnWr> = ({handleOpenRightBox, active, positionFixedBtn}) => {
	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<Portal>
			<IconButton inlineStyles={positionFixedBtn} onClick={handleOpenRightBox} className={classNames(styles.aiBtn, {
				[styles.active]: active && mounted,
			})} icon='STARS' active={false}/>
		</Portal>
	)
}