import {FC, ReactNode, createElement, useState, useRef} from "react"
import {useOnClickOutside} from "@/hooks/useOnClickOutside"
import {createPortal} from "react-dom"
import {CustomToolTip} from "@/components/tooltip/customTooltip"

type TooltipTriggerProps = {
	children: ReactNode
	tag: string
	setIsLocked: (isLocked: boolean) => void
	isLocked: boolean
	tooltipContent: ReactNode
	className: string
}

export const TooltipTrigger: FC<TooltipTriggerProps> = (
	{
		children,
		tag = 'div',
		setIsLocked,
		isLocked,
		tooltipContent,
		className,
	}) => {
	const [isToolTip, setIsToolTip] = useState(false)
	const toolTipRef = useRef<HTMLDivElement | null>(null)
	const tagRef = useRef<HTMLButtonElement | null>(null)

	const handleToolTip = () => {
		setIsToolTip && setIsToolTip(true)
		setIsLocked(!isLocked)
	}

	const handleRemoveToolTip = () => {
		setIsToolTip && setIsToolTip(false)
	}

	useOnClickOutside(tagRef, handleRemoveToolTip, toolTipRef)

	const Element = createElement(tag, { ref: tagRef, className: className, onClick: handleToolTip }, children)

	return (
		<>
			{Element}
			{Element && isToolTip &&
				createPortal(
					<CustomToolTip
						toolTipRef={toolTipRef}
						isToolTip={isToolTip}
						triggerElement={tagRef}
						handleRemoveToolTip={handleRemoveToolTip}
						positionY='top'
						width={115}
					>
						{tooltipContent}
					</CustomToolTip>,
					document.body
				)}
		</>
	)
}