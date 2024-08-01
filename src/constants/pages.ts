import IPage from "../interface/IPage";
import CustomContextMenu from "../pages/ContextMenu/ContextMenu";
import CustomDropdown from "../pages/Dropdown/Dropdown";
import CustomHoverCard from "../pages/HoverCard/HoverCard";
import SecretsEnvVars from "../pages/SecretsEnvVars/SecretsEnvVars";

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
	{
		name: "Secrets and Env Variables",
		path: "/secrets-env-vars",
		component: SecretsEnvVars,
	},
	{
		name: "Hover Card",
		path: "/hover-card",
		component: CustomHoverCard,
	},
];

export default CPages;
