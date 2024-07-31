import IPage from "../interface/IPage";
import CustomContextMenu from "../pages/ContextMenu/ContextMenu";
import CustomDropdown from "../pages/Dropdown/Dropdown";

const CPages: IPage[] = [
	{
		name: "Context Menu",
		path: "/context-menu",
		component: CustomContextMenu,
	},
	{
		name: "Dropdown",
		path: "/dropdown",
		component: CustomDropdown,
	},
];

export default CPages;
