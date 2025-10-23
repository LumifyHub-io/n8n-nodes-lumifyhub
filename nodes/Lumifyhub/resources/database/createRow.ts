import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreateRow = {
	operation: ['createRow'],
	resource: ['database'],
};

export const databaseCreateRowDescription: INodeProperties[] = [
	{
		displayName: 'Data Source',
		name: 'data_source_selector',
		type: 'options',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCreateRow,
		},
		typeOptions: {
			loadOptionsMethod: 'getDataSources',
		},
		description: 'Select the data source to create a row in',
	},
	{
		displayName: 'Database ID',
		name: 'database_id',
		type: 'hidden',
		default: '={{$parameter["data_source_selector"].split(":")[0]}}',
		displayOptions: {
			show: showOnlyForCreateRow,
		},
	},
	{
		displayName: 'Data Source ID',
		name: 'data_source_id',
		type: 'hidden',
		default: '={{$parameter["data_source_selector"].split(":")[1]}}',
		displayOptions: {
			show: showOnlyForCreateRow,
		},
		routing: {
			send: {
				type: 'body',
				property: 'data_source_id',
			},
		},
	},
	{
		displayName: 'Row Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCreateRow,
		},
		description: 'The title of the database row (first column)',
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'Properties',
		name: 'properties',
		placeholder: 'Add Property',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: showOnlyForCreateRow,
		},
		description: 'Additional properties to set on the database row',
		options: [
			{
				name: 'property',
				displayName: 'Property',
				values: [
					{
						displayName: 'Property',
						name: 'propertyId',
						type: 'options',
						default: '',
						required: true,
						description: 'Select the property to set',
						typeOptions: {
							loadOptionsMethod: 'getDataSourceProperties',
							loadOptionsDependsOn: ['data_source_selector'],
						},
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value to set for this property',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'properties',
				value: '={{ Object.fromEntries($value.property.map(p => [p.propertyId, p.value])) }}',
			},
		},
	},
];
