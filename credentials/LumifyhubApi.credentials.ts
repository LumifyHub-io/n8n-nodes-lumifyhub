import type {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LumifyhubApi implements ICredentialType {
	name = 'lumifyhubApi';

	displayName = 'Lumifyhub API';

	// Link to your community node's README
	documentationUrl = 'https://docs.lumifyhub.com/integrations/n8n';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Generate an API key from your workspace settings under Integrations',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://lumifyhub.io/api/v1',
			description: 'The base URL for the LumifyHub API (use http://localhost:3000/api/v1 for local development)',
			placeholder: 'https://lumifyhub.io/api/v1',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	// Note: Credential testing requires actually creating a page since we don't have a dedicated health check endpoint
	// Users can verify credentials by testing the Create Page operation
}
