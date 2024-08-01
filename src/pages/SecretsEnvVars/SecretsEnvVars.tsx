import Header from "../../components/Header/Header";
import "./SecretsEnvVars.scss";

const SecretsEnvVars = () => {
	const secret = import.meta.env.VITE_SECRETS;
	const envVar = import.meta.env.VITE_ENVVARS;

	return (
		<>
			<Header />
			<div className="secrets-env-vars">
				<h1>Secrets and Evironment Variables</h1>
				<div className="credentials">
					<label>Secret</label>
					<div className="sep"></div>
					<h3>{secret}</h3>
				</div>
				<div className="credentials">
					<label>Environment Variable</label>
					<div className="sep"></div>
					<h3>{envVar}</h3>
				</div>
			</div>
		</>
	);
};

export default SecretsEnvVars;
