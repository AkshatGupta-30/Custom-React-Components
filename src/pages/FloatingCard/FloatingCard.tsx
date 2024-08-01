/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./FloatingCard.scss";

const buttons = [
	{ title: "Github", url: "github.com" },
	{ title: "Stack Overflow", url: "stackoverflow.com" },
	{ title: "Youtube", url: "youtube.com" },
	{ title: "Instagram", url: "instagram.com" },
];

const defaultFloatCardFeat = {
	x: 0,
	y: 0,
	toggled: false,
};

const FloatCard = ({
	floatCard,
	floatRef,
	index,
}: {
	floatCard: typeof defaultFloatCardFeat;
	floatRef: RefObject<HTMLDivElement>;
	index: number;
}) => {
	return (
		<div
			ref={floatRef}
			style={{
				top: `${floatCard.y + 2}px`,
				left: `${floatCard.x + 2}px`,
			}}
			className={`float-card ${floatCard.toggled ? "active" : null}`}
		>
			<h3>{index !== -1 && buttons[index].url}</h3>
		</div>
	);
};

const CustomFloatingCard: React.FC = () => {
	const floatCardRef = useRef<HTMLDivElement>(null);
	const [card, setCard] = useState(defaultFloatCardFeat);
	const [index, setIndex] = useState<number>(-1);
	const latestMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	let floatTimeout: NodeJS.Timeout;

	const parentClassName = "parent";
	const childClassName = "child";

	const handleOnEnter = (
		ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
		i: number,
	) => {
		ev.preventDefault();
		floatTimeout = setTimeout(() => {
			if (floatCardRef.current) {
				const childCurrentCard =
					document.getElementsByClassName(childClassName)[i];
				const childCurrentCardAttr = childCurrentCard.getBoundingClientRect();
				const floatCardAttr = floatCardRef.current.getBoundingClientRect();
				const isLeft = ev.clientX + floatCardAttr.width < window?.innerWidth;
				const isTop =
					childCurrentCardAttr.y +
						childCurrentCardAttr.height +
						floatCardAttr.height >
					window?.innerHeight;
				console.log(isTop);

				setIndex(i);
				setCard({
					x: isLeft
						? latestMousePos.current.x
						: latestMousePos.current.x - floatCardAttr.width,
					y: isTop
						? childCurrentCardAttr.y - floatCardAttr.height - 5
						: childCurrentCardAttr.y + childCurrentCardAttr.height + 2,
					toggled: true,
				});
			}
		}, 800);
	};

	const handleOnLeave = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		ev.preventDefault();
		clearTimeout(floatTimeout);
		setIndex(-1);
		setCard(defaultFloatCardFeat);
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
			<div className="custom-float-card">
				<h1>Custom Floating Card</h1>
				<div className={parentClassName}>
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
					<FloatCard floatCard={card} floatRef={floatCardRef} index={index} />
				</div>
			</div>
		</>
	);
};

export default CustomFloatingCard;
