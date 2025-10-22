import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { pageDescription } from './resources/page';

export class Lumifyhub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lumifyhub',
		name: 'lumifyhub',
		icon: { light: 'file:lumifyhub.svg', dark: 'file:lumifyhub.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create and manage pages in LumifyHub workspace',
		defaults: {
			name: 'Lumifyhub',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'lumifyhubApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Page',
						value: 'page',
					},
				],
				default: 'page',
			},
			...pageDescription,
		],
	};
}
