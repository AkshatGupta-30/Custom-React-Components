import IPage from "../interface/IPage";
import CustomContextMenu from "../pages/ContextMenu/ContextMenu";
import CustomDropdown from "../pages/Dropdown/Dropdown";
import CustomFloatingCard from "../pages/FloatingCard/FloatingCard";
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
		name: "Floating Card",
		path: "/floating-card",
		component: CustomFloatingCard,
	},
];

export default CPages;
