import React from "react";

interface IPage {
	name: string;
	path: string;
	component: React.FC;
	subPages?: IPage[];
}

export default IPage;
