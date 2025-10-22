import type { INodeProperties } from 'n8n-workflow';
import { pageCreateDescription } from './create';

const showOnlyForPages = {
	resource: ['page'],
};

export const pageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPages,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new page',
				description: 'Create a new page in your LumifyHub workspace',
				routing: {
					request: {
						method: 'POST',
						url: '/integrations/pages',
					},
				},
			},
		],
		default: 'create',
	},
	...pageCreateDescription,
];
