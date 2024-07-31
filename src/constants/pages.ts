import IPage from "../interface/IPage";
import ContextMenu from "../pages/ContextMenu/ContextMenu";
import Dropdown from "../pages/Dropdown/Dropdown";

const CPages: IPage[] = [
	{
		name: "Context Menu",
		path: "/context-menu",
		component: ContextMenu,
	},
	{
		name: "Dropdown",
		path: "/dropdown",
		component: Dropdown,
	},
];

export default CPages;
