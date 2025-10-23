import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LumifyhubApi implements ICredentialType {
	name = 'lumifyhubApi';

	displayName = 'Lumifyhub API';

	icon = { light: 'file:lumifyhub.svg', dark: 'file:lumifyhub.dark.svg' } as const;

	// Link to your community node's README
	documentationUrl = 'https://lumifyhub.io/n8n-docs';

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

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/integrations/auth/verify',
			method: 'GET',
		},
	};
}
