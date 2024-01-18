import {FC} from "react"
import styles from './chat.module.scss'
import {TMessages} from "@/components/result/interactioneBox/chat/chat"
import classNames from "classnames"

type TMessageItem = {
	item: TMessages
}

enum ACCOUNT_TYPE {
	USER = 'user',
	BOT = 'bot',
}

export const MessageItem: FC<TMessageItem> = ({item}) => {
	return (
		<div className={classNames(styles.msgItem, {
			[styles.botMsg]: item.accountType === ACCOUNT_TYPE.BOT,
			[styles.userMsg]: item.accountType === ACCOUNT_TYPE.USER,
		})}>
			<p className={classNames(styles.item, {
				[styles.gradient]: item.accountType === ACCOUNT_TYPE.BOT,
				[styles.userMsg]: item.accountType === ACCOUNT_TYPE.USER,
			})}>
				{item.msg}
			</p>
		</div>
	)
}