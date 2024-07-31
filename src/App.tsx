import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import CPages from "./constants/pages";
import IPage from "./interface/IPage";
import Home from "./pages/Home/Home";

function App() {
	return (
		<BrowserRouter basename="/Custom-React-Components/">
			<Routes>
				<Route path="/" Component={Home} />
				{CPages.map((page: IPage, index: number) => (
					<Route key={index} path={page.path} Component={page.component} />
				))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
