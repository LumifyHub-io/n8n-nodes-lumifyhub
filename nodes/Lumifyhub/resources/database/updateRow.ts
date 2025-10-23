import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdateRow = {
	operation: ['updateRow'],
	resource: ['database'],
};

export const databaseUpdateRowDescription: INodeProperties[] = [
	{
		displayName: 'Row ID',
		name: 'row_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUpdateRow,
		},
		description: 'The ID of the row to update (this is the page ID)',
	},
	{
		displayName: 'Row Title',
		name: 'title',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUpdateRow,
		},
		description: 'Update the row title (leave empty to keep existing)',
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
			show: showOnlyForUpdateRow,
		},
		description: 'Properties to update (partial update - only specified properties will be changed)',
		options: [
			{
				name: 'property',
				displayName: 'Property',
				values: [
					{
						displayName: 'Property Name or ID',
						name: 'propertyId',
						type: 'options',
						default: '',
						required: true,
						description: 'Select the property to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
						typeOptions: {
							loadOptionsMethod: 'getRowProperties',
							loadOptionsDependsOn: ['row_id'],
						},
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The new value for this property',
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
