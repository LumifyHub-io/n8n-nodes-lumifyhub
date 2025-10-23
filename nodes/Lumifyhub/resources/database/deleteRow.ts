import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDeleteRow = {
	operation: ['deleteRow'],
	resource: ['database'],
};

export const databaseDeleteRowDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'row_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForDeleteRow,
		},
		description: 'The ID of the row to delete (this is the page ID)',
	},
];
