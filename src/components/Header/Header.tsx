import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
	const navigate = useNavigate();

	return (
		<header className="header" onClick={() => navigate(-1)}>
			Home
		</header>
	);
};

export default Header;
