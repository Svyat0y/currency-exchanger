import styles from './search.module.scss'
import {Input} from "@/components/input"
import {FC, useRef} from "react"
import Image from "next/image"

type SearchProps = {
	handleChangeInput: (value: string) => void
	searchInput: string
}

export const Search: FC<SearchProps> = ({handleChangeInput, searchInput}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	return (
		<div className={styles.wrapper}>
			<Image src={'./icons/search.svg'} alt={''} width={16} height={16}/>
			<Input
				id='search'
				handleChangeInput={handleChangeInput}
				placeholder='Type a currency or ticker'
				value={searchInput}
				inputRef={inputRef}
			/>
		</div>
	)
}