import type { INodeProperties } from 'n8n-workflow';
import { databaseCreateRowDescription } from './createRow';
import { databaseGetRowsDescription } from './getRows';
import { databaseGetRowDescription } from './getRow';
import { databaseUpdateRowDescription } from './updateRow';
import { databaseDeleteRowDescription } from './deleteRow';

const showOnlyForDatabases = {
	resource: ['database'],
};

export const databaseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDatabases,
		},
		options: [
			{
				name: 'Create Row',
				value: 'createRow',
				action: 'Create a database row',
				description: 'Create a new row in a database',
				routing: {
					request: {
						method: 'POST',
						url: '=/integrations/databases/{{$parameter["database_id"]}}/rows',
					},
				},
			},
			{
				name: 'Get Rows',
				value: 'getRows',
				action: 'Get all database rows',
				description: 'Get all rows from a database',
				routing: {
					request: {
						method: 'GET',
						url: '=/integrations/databases/{{$parameter["database_id"]}}/rows',
					},
				},
			},
			{
				name: 'Get Row',
				value: 'getRow',
				action: 'Get a database row',
				description: 'Get a single row by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/integrations/rows/{{$parameter["row_id"]}}',
					},
				},
			},
			{
				name: 'Update Row',
				value: 'updateRow',
				action: 'Update a database row',
				description: 'Update an existing row by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/integrations/rows/{{$parameter["row_id"]}}',
					},
				},
			},
			{
				name: 'Delete Row',
				value: 'deleteRow',
				action: 'Delete a database row',
				description: 'Delete a row by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/integrations/rows/{{$parameter["row_id"]}}',
					},
				},
			},
		],
		default: 'createRow',
	},
	...databaseCreateRowDescription,
	...databaseGetRowsDescription,
	...databaseGetRowDescription,
	...databaseUpdateRowDescription,
	...databaseDeleteRowDescription,
];
