import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPageCreate = {
	operation: ['create'],
	resource: ['page'],
};

export const pageCreateDescription: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForPageCreate,
		},
		description: 'The title of the page',
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForPageCreate,
		},
		description: 'The content of the page (plain text)',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Parent Page ID',
		name: 'parent_page_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForPageCreate,
		},
		description: 'The ID of the parent page (leave empty for root-level page)',
		routing: {
			send: {
				type: 'body',
				property: 'parent_page_id',
			},
		},
	},
	{
		displayName: 'Icon',
		name: 'icon',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForPageCreate,
		},
		description: 'The icon for the page (emoji)',
		routing: {
			send: {
				type: 'body',
				property: 'icon',
			},
		},
	},
	{
		displayName: 'Cover Image URL',
		name: 'cover_image',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForPageCreate,
		},
		description: 'The cover image URL for the page',
		routing: {
			send: {
				type: 'body',
				property: 'cover_image',
			},
		},
	},
];
