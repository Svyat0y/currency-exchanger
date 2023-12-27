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

	const handleHoverToolTip = () => {
		setIsToolTip && setIsToolTip(true)
	}

	const handleClickOnToolTip = () => {
		setIsLocked(!isLocked)
	}

	const handleRemoveToolTip = () => {
		setIsToolTip && setIsToolTip(false)
	}

	const Element = createElement(tag, {
		ref: tagRef,
		className: className,
		onMouseEnter: handleHoverToolTip,
		onMouseLeave: handleRemoveToolTip,
		onClick: handleClickOnToolTip,
	}, children)

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