import styles from './search.module.scss'
import {Input} from "@/components/input"
import {FC, Ref, useCallback, useRef, useState} from "react"
import Image from "next/image"
import classNames from "classnames"
import {useSticky} from "@/hooks/useSticky"
import {debounce} from "@/utils/helpers"

type SearchProps = {
	setSearchInput: (value: string) => void
	className: string
	parentRef: Ref<HTMLDivElement> | null
}

export const Search: FC<SearchProps> = ({setSearchInput, className, parentRef}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const container = useSticky<HTMLDivElement>(parentRef, 60)
	const [localState, setLocalState] = useState('')

	const debouncedChangeInput = useCallback(
		debounce((value: string) => setSearchInput(value), 500),
		[setSearchInput]
	)
	const handleInputChange = (value: string) => {
		setLocalState(value)
		debouncedChangeInput(value)
	}
	return (
		<div ref={container.ref} className={classNames(styles.wrapper, className, {
			[styles.isSticky]: container.isSticky
		})}>
			<Image src={'./icons/search.svg'} alt={''} width={16} height={16}/>
			<Input
				id='search'
				handleChangeInput={handleInputChange}
				placeholder='Type a currency or ticker'
				value={localState}
				inputRef={inputRef}
				autocomplete={'off'}
			/>
		</div>
	)
}