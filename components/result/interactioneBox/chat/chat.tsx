import styles from './chat.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {Input} from "@/components/input"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {FormEvent, useEffect, useRef, useState} from "react"
import {MessageItem} from "./messageItem"

const botMsg = {
	id: 0,
	accountType: 'bot',
	msg: 'Hi! I\'m an irrational SwapHub AI bot, say "Fire" and I\'ll blow up this page.'
}

export type TMessages = {
	id: number | string
	accountType: string
	msg: string
}

export const Chat = () => {
	const [inputValue, setInputValue] = useState('')
	const [messages, setMessages] = useState<TMessages[]>([])
	const messagesContainerRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		setTimeout(() => {
			setMessages((prevState) => [...prevState, botMsg] as TMessages[])
		}, 2000)
	},[])

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.addEventListener('DOMNodeInserted', (event) => {
				const target = event.currentTarget
				if (target instanceof HTMLElement) {
					target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
				}
			})
		}
	}, [messages])

	const handleInputChange = (value: string) => {
		setInputValue(value)
	}

	const sendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let count = 1
		if(inputValue) {
			const obj = {
				id: count + 1,
				accountType: 'user',
				msg: inputValue
			}
			setMessages((prevState) => [...prevState, obj] as TMessages[])
			setInputValue('')
			setTimeout(() => {
				setMessages((prevState) => [...prevState, botMsg] as TMessages[])
			}, 1000)
		}
	}

	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>AI Assistant</h5>
			<div className={styles.borderWrapper}>
				<GradientBorder active={false}/>
				<div className={styles.content}>
					<div ref={messagesContainerRef} className={styles.body}>
						{messages?.map((item) => {
							return (
								<MessageItem key={item.id} item={item}/>
							)
						})}
					</div>
					<form className={styles.navigation} onSubmit={sendMessage}>
						<Input placeholder='Enter message' className={styles.input} handleChangeInput={handleInputChange}
						       value={inputValue} id={'sendMessage'} inputRef={inputRef}/>
						<IconButton className={styles.icon} icon={'CURSOR'} active={false}/>
					</form>
				</div>
			</div>
		</div>
	)
}