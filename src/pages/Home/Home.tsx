import { Link } from "react-router-dom";
import CPages from "../../constants/pages";
import IPage from "../../interface/IPage";
import "./Home.scss";

const Home: React.FC = () => {
	return (
		<div className="home-page">
			{CPages.map((page: IPage, index: number) => (
				<Link key={index} to={page.path} className="home-button">
					{page.name}
				</Link>
			))}
		</div>
	);
};

export default Home;
