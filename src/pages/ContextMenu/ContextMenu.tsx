/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { IoIosAdd } from "react-icons/io";
import "./ContextMenu.scss";

const contextMenuButtons = [
	{ title: "Github", url: "github.com" },
	{ title: "Stack Overflow", url: "stackoverflow.com" },
	{ title: "Youtube", url: "youtube.com" },
	{ title: "Instagram", url: "instagram.com" },
];

const defaultContextMenu = {
	x: 0,
	y: 0,
	toggled: false,
};

const ContextMenuItems: React.FC = () => {
	const contextMenuRef = useRef<HTMLUListElement>(null);
	const excludeRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	const [contextMenu, setContextMenu] = useState(defaultContextMenu);
	const [_, setIndex] = useState<number>(-1);

	const parentClassName = "parent";
	const childClassName = "child";

	const handleOnContextMenu = (
		ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
		i: number,
	) => {
		ev.preventDefault();
		const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
		const isLeft = ev.clientX < window?.innerWidth;

		if (contextMenuAttr) {
			setIndex(i);
			setContextMenu({
				x: isLeft ? ev.clientX : ev.clientX - contextMenuAttr.width,
				y: ev.clientY,
				toggled: true,
			});
		}
	};

	useEffect(() => {
		function clickHandler(ev: MouseEvent) {
			//* - Check if the contextMenuRef.current exists and is not a descendant of the clicked target
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(ev.target as Node)
			) {
				setContextMenu(defaultContextMenu);
			}
		}

		function contextHandler(ev: MouseEvent) {
			const target = ev.target as HTMLElement;
			if (
				//* - If context menu is active
				contextMenuRef.current &&
				//* - If element clicked is other than context menu
				!contextMenuRef.current.contains(target) &&
				//* - If element(parent) clicked does not contains className childClassName
				!target.classList.contains(childClassName) &&
				//* - If parent Ref exists
				parentRef.current &&
				//* - If element clicked has descendant className childClassName or excludeRef button clicked
				(target.querySelector(`.${childClassName}`) ||
					excludeRef.current?.contains(target))
			) {
				setContextMenu(defaultContextMenu);
			}
		}

		document.addEventListener("click", clickHandler);
		document.addEventListener("contextmenu", contextHandler);

		return () => {
			document.removeEventListener("click", clickHandler);
			document.removeEventListener("contextmenu", contextHandler);
		};
	});

	const ContextMenu = ({ contextRef }: { contextRef: RefObject<HTMLUListElement> }) => {
		return (
			<ul
				ref={contextRef}
				style={{ top: `${contextMenu.y + 2}px`, left: `${contextMenu.x + 2}px` }}
				className={`context-menu ${contextMenu.toggled ? "active" : null}`}
			></ul>
		);
	};

	return (
		<>
			<Header />
			<div className="custom-context-menu">
				<h1>Custom Context Menu</h1>
				<div className={parentClassName} ref={parentRef}>
					{contextMenuButtons.map((btn, index) => (
						<div
							key={index}
							className={childClassName}
							onContextMenu={(ev) => handleOnContextMenu(ev, index)}
						>
							<div className="img-wrapper">
								<img
									src={`https://icon.horse/icon/${btn.url}`}
									alt=""
									loading="lazy"
									className="favicon"
								/>
							</div>
							<div className="name">{btn.title}</div>
						</div>
					))}
					<div ref={excludeRef} className="child">
						<div className="img-wrapper">
							<IoIosAdd className="add-icon" />
						</div>
						<div className="name">Add Site</div>
					</div>
					<ContextMenu contextRef={contextMenuRef} />
				</div>
			</div>
		</>
	);
};

export default ContextMenuItems;
