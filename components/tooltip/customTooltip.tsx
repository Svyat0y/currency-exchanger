import React, {FC, useEffect, useState} from "react"
import styles from './customTooltip.module.scss'
import {createPortal} from "react-dom"
import classNames from "classnames"
import {TCustomToolTipProps, TToolTipPosition} from "./types"
import {getElemPosition, getPositionTips, POSITIONX, POSITIONY} from "./helpers"

export const CustomToolTip: FC<TCustomToolTipProps> = (
	{
		triggerRef,
		toolTipRef,
		triggerElement,
		isToolTip,
		handleRemoveToolTip,
		className,
		indentY = 15,
		indentX = 8,
		positionX = 'center',
		positionY = 'bottom',
		width = 130,
		children
	}) => {


	const {triggerPosition, triggerWidth, triggerHeight} = getElemPosition(triggerElement)

	const [isToolTipLoaded, setIsToolTipLoaded] = useState(false)
	const [toolTipWidth, setToolTipWidth] = useState<number | null>(null)
	const [toolTipHeight, setToolTipHeight] = useState<number | null>(null)
	const [isPositionY, setIsPositionY] = useState(false)

	const toolTipPosition: TToolTipPosition = {x: 0, y: 0}
	let classFlag = positionX;

	useEffect(() => {
		if (isToolTipLoaded && toolTipRef?.current) {
			const toolTipWidth = toolTipRef?.current && toolTipRef?.current?.getBoundingClientRect().width
			const toolTipHeight = toolTipRef?.current && toolTipRef?.current?.firstElementChild?.clientHeight

			setToolTipWidth(toolTipWidth)
			setToolTipHeight(toolTipHeight ?? 0)

			if (toolTipHeight) {
				setIsPositionY(triggerPosition.y + toolTipHeight + indentY > window.innerHeight + window.scrollY)
			}
		}
		setIsToolTipLoaded(true)
	}, [isToolTipLoaded, toolTipRef?.current])


	if (toolTipHeight && toolTipWidth && triggerWidth) {
		const positionAdjustments = {
			[POSITIONY.top]: triggerHeight + toolTipHeight + indentY,
			[POSITIONY.bottom]: -indentY,

			[POSITIONX.center]: (toolTipWidth / 2) - (triggerWidth / 2),
			[POSITIONX.left]: toolTipWidth - triggerWidth - indentX,
			[POSITIONX.right]: indentX,
		}

		const position = getPositionTips(positionX, triggerPosition, positionAdjustments, indentX, toolTipWidth, triggerWidth)
		classFlag = position

		toolTipPosition.x = triggerWidth && triggerPosition.x - positionAdjustments[position];
		toolTipPosition.y = triggerHeight && triggerPosition.y - positionAdjustments[`${isPositionY ? 'top' : positionY}`];
	}

	useEffect(() => {
		let onClearToolTip: any
		const scrollParent = triggerRef?.current?.closest('.scrollParentForTooltip')

		if (isToolTip) {
			onClearToolTip = () => handleRemoveToolTip && handleRemoveToolTip()
			window.addEventListener("orientationchange", onClearToolTip)
			window.addEventListener("scroll", onClearToolTip);
			scrollParent && scrollParent.addEventListener('scroll', onClearToolTip)
		}
		return () => {
			window.removeEventListener("orientationchange", onClearToolTip)
			window.removeEventListener("scroll", onClearToolTip)
			scrollParent && scrollParent.removeEventListener('scroll', onClearToolTip)
		}
	}, [isToolTip])

	return (
		createPortal(isToolTipLoaded &&
      <div
        ref={toolTipRef}
        style={{top: toolTipPosition.y + 'px', left: toolTipPosition.x + 'px', width: width + 'px', height: toolTipHeight + 'px'}}
        className={classNames(styles.tipsInfo, styles[className ?? ''], {
					[styles.topTips]: positionY === 'top' || isPositionY,
					[styles[classFlag]]: classFlag
				})}>
				{children}
      </div>,
			document.body
		)
	)
}