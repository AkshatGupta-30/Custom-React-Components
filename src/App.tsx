import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import CPages from "./constants/pages";
import IPage from "./interface/IPage";

function App() {
	return (
		<BrowserRouter basename="/Custom-React-Components/">
			<Routes>
				{CPages.map((page: IPage, index: number) => (
					<Route
						key={index}
						path={page.path}
						element={<h1>{page.name}</h1>}
					/>
				))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
