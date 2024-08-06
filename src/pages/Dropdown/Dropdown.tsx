import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./Dropdown.scss";
import { FaCaretDown } from "react-icons/fa6";

const CustomDropdown: FC = () => {
	const [selected, setSelected] = useState<number>(0);

	const DropdownMenu = ({
		btnTitle,
		ddList,
		selected,
		setSelected,
	}: {
		btnTitle: string;
		ddList: string[];
		selected: number;
		setSelected: Dispatch<SetStateAction<number>>;
	}) => {
		const [isOpen, setIsOpen] = useState<boolean>(false);
		const dropdownRef = useRef<HTMLDivElement>(null);
		const btnRef = useRef<HTMLButtonElement>(null);

		const toggleDropdown = () => setIsOpen(!isOpen);

		useEffect(() => {
			const handler = (ev: Event) => {
				if (
					dropdownRef.current &&
					!dropdownRef.current.contains(ev.target as Node)
				) {
					setIsOpen(false);
				}
			};

			document.addEventListener("click", handler);
			return () => {
				document.removeEventListener("click", handler);
			};
		}, []);

		useEffect(() => {
			setIsOpen(false);
		}, [selected]);

		function getTop(): number {
			let top = 0;
			if (btnRef.current) {
				const btnAttr = btnRef.current.getBoundingClientRect();
				top = btnAttr.height + 5;
			}
			return top;
		}

		return (
			<div className="dropdown" ref={dropdownRef}>
				<button
					ref={btnRef}
					onClick={toggleDropdown}
					className={`dd-button ${isOpen ? "btn-open" : null}`}
				>
					<span>{btnTitle}</span>
					<FaCaretDown className="icon" />
				</button>
				<div
					className={`dd-content ${isOpen ? "content-open" : null}`}
					style={{ top: getTop() }}
				>
					{ddList.map((item: string, i: number) => (
						<li
							key={i}
							className={`item ${selected === i ? "selected" : null}`}
							onClick={() => setSelected(i)}
						>
							{item}
						</li>
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			<Header />
			<div className="custom-dropdown">
				<DropdownMenu
					btnTitle="Sort By"
					ddList={["A-Z", "Z-A", "Recent Visited", "Mostly Visited"]}
					selected={selected}
					setSelected={setSelected}
				/>
				<h1>Custom Dropdown</h1>
				<h3>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
					placeat provident quia quod quaerat dolorem illum numquam incidunt
					corporis, quos quisquam doloremque nesciunt omnis delectus nostrum
					natus a! Doloribus, quasi!
				</h3>
				<h3>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
					placeat provident quia quod quaerat dolorem illum numquam incidunt
					corporis, quos quisquam doloremque nesciunt omnis delectus nostrum
					natus a! Doloribus, quasi!
				</h3>
			</div>
		</>
	);
};

export default CustomDropdown;
