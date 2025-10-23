import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetRows = {
	operation: ['getRows'],
	resource: ['database'],
};

export const databaseGetRowsDescription: INodeProperties[] = [
	{
		displayName: 'Data Source',
		name: 'data_source_selector',
		type: 'options',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForGetRows,
		},
		typeOptions: {
			loadOptionsMethod: 'getDataSources',
		},
		description: 'Select the data source to get rows from',
	},
	{
		displayName: 'Database ID',
		name: 'database_id',
		type: 'hidden',
		default: '={{$parameter["data_source_selector"].split(":")[0]}}',
		displayOptions: {
			show: showOnlyForGetRows,
		},
	},
	{
		displayName: 'Data Source ID',
		name: 'data_source_id',
		type: 'hidden',
		default: '={{$parameter["data_source_selector"].split(":")[1]}}',
		displayOptions: {
			show: showOnlyForGetRows,
		},
		routing: {
			send: {
				type: 'query',
				property: 'data_source_id',
			},
		},
	},
];
