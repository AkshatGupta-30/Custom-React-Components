/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./HoverCard.scss";

const buttons = [
	{ title: "Github", url: "github.com" },
	{ title: "Stack Overflow", url: "stackoverflow.com" },
	{ title: "Youtube", url: "youtube.com" },
	{ title: "Instagram", url: "instagram.com" },
];

const defaultHoverCard = {
	x: 0,
	y: 0,
	toggled: false,
};

const HoverCard = ({
	hoverCard,
	hoverRef,
	index,
}: {
	hoverCard: typeof defaultHoverCard;
	hoverRef: RefObject<HTMLDivElement>;
	index: number;
}) => {
	return (
		<div
			ref={hoverRef}
			style={{
				top: `${hoverCard.y + 2}px`,
				left: `${hoverCard.x + 2}px`,
			}}
			className={`hover-card ${hoverCard.toggled ? "active" : null}`}
		>
			<h3>{index !== -1 && buttons[index].url}</h3>
		</div>
	);
};

const CustomHoverCard: React.FC = () => {
	const hoverCardRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	const [hoverCard, setHoverCard] = useState(defaultHoverCard);
	const [index, setIndex] = useState<number>(-1);
	const latestMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	let hoverTimeout: NodeJS.Timeout;

	const parentClassName = "parent";
	const childClassName = "child";

	const handleOnEnter = (
		ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
		i: number,
	) => {
		ev.preventDefault();
		hoverTimeout = setTimeout(() => {
			if (hoverCardRef.current) {
				const hoveredCard = document.getElementsByClassName(childClassName)[i];
				const hoveredCardAttr = hoveredCard.getBoundingClientRect();
				const hoverCardAttr = hoverCardRef.current.getBoundingClientRect();
				const isLeft = ev.clientX + hoverCardAttr.width < window?.innerWidth;
				const isTop =
					hoveredCardAttr.y + hoveredCardAttr.height + hoverCardAttr.height >
					window?.innerHeight;
				console.log(isTop);

				setIndex(i);
				setHoverCard({
					x: isLeft
						? latestMousePos.current.x
						: latestMousePos.current.x - hoverCardAttr.width,
					y: isTop
						? hoveredCardAttr.y - hoverCardAttr.height - 5
						: hoveredCardAttr.y + hoveredCardAttr.height + 2,
					toggled: true,
				});
			}
		}, 800);
	};

	const handleOnLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		ev.preventDefault();
		clearTimeout(hoverTimeout);
		setIndex(-1);
		setHoverCard(defaultHoverCard);
	};

	useEffect(() => {
		const mouseMove = (ev: MouseEvent) => {
			latestMousePos.current = { x: ev.clientX, y: ev.clientY };
		};
		document.addEventListener("mousemove", mouseMove);
		return () => document.removeEventListener("mousemove", mouseMove);
	}, []);

	return (
		<>
			<Header />
			<div className="custom-hover-card">
				<h1>Custom Hover Card</h1>
				<div className={parentClassName} ref={parentRef}>
					{buttons.map((btn, i) => (
						<div
							key={i}
							className={childClassName}
							onMouseEnter={(ev) => handleOnEnter(ev, i)}
							onMouseLeave={handleOnLeave}
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
					<HoverCard
						hoverCard={hoverCard}
						hoverRef={hoverCardRef}
						index={index}
					/>
				</div>
			</div>
		</>
	);
};

export default CustomHoverCard;
