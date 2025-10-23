import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetRow = {
	operation: ['getRow'],
	resource: ['database'],
};

export const databaseGetRowDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'row_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForGetRow,
		},
		description: 'The ID of the row to get (this is the page ID)',
	},
];
