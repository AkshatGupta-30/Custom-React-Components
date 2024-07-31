import React from "react";
import Header from "../../components/Header/Header";
import "./Dropdown.scss";

const CustomDropdown: React.FC = () => {
	const Dropdown = React.memo(() => {
		const [isOpen, setIsOpen] = React.useState<boolean>(false);
		const dropdownRef: React.MutableRefObject<HTMLDivElement | null> =
			React.useRef<HTMLDivElement | null>(null);

		const toggleDropdown = () => {
			setIsOpen(!isOpen);
		};

		React.useEffect(() => {
			const handler = (event: Event) => {
				console.log("Handler");
				if (
					dropdownRef.current &&
					!dropdownRef.current.contains(event.target as Node)
				) {
					setIsOpen(false);
				}
			};

			document.addEventListener("click", handler);

			return () => {
				document.removeEventListener("click", handler);
			};
		}, []);

		return (
			<div className="dropdown" ref={dropdownRef}>
				<button
					onClick={toggleDropdown}
					className={`dd-button ${isOpen ? "btn-open" : null}`}
				>
					Languages
				</button>
				<div className={`dd-content ${isOpen ? "content-open" : null}`}>
					<li className="item">C</li>
					<li className="item">C++</li>
					<li className="item">Python</li>
					<li className="item">Javascript</li>
					<li className="item">Dart</li>
				</div>
			</div>
		);
	});

	return (
		<>
			<Header />
			<div className="custom-dropdown">
				<Dropdown />
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
