import type {
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { pageDescription } from './resources/page';
import { databaseDescription } from './resources/database';

export class Lumifyhub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LumifyHub',
		name: 'lumifyhub',
		icon: { light: 'file:lumifyhub.svg', dark: 'file:lumifyhub.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create and manage pages and databases in LumifyHub workspace',
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
					{
						name: 'Database',
						value: 'database',
					},
				],
				default: 'page',
			},
			...pageDescription,
			...databaseDescription,
		],
	};

	methods = {
		loadOptions: {
			/**
			 * Load all data sources available in the workspace
			 * Used by the "Get Rows" operation to populate data source dropdown
			 */
			async getDataSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('lumifyhubApi');
				const baseUrl = credentials.baseUrl as string;
				const apiKey = credentials.apiKey as string;

				try {
					// Call the integration API to get all data sources
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/integrations/data-sources`,
						headers: {
							'x-api-key': apiKey,
							Accept: 'application/json',
						},
					});

					// Format response for n8n dropdown
					// Each option value is "database_id:data_source_id"
					// This allows us to construct the correct API URL
					const options: INodePropertyOptions[] = response.map(
						(source: {
							id: string;
							name: string;
							database_id: string;
							database_name: string;
							is_linked: boolean;
						}) => ({
							name: `${source.database_name} → ${source.name}${source.is_linked ? ' (Linked)' : ''}`,
							value: `${source.database_id}:${source.id}`,
							description: `Data source in "${source.database_name}" database`,
						}),
					);

					return options;
				} catch (error) {
					// If API call fails, return empty array with error message
					console.error('Failed to load data sources:', error);
					return [
						{
							name: 'Error Loading Data Sources',
							value: '',
							description: 'Please check your API credentials and try again',
						},
					];
				}
			},

			/**
			 * Load properties for a specific data source
			 * Used by the "Create Row" operation to show available properties
			 */
			async getDataSourceProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('lumifyhubApi');
				const baseUrl = credentials.baseUrl as string;
				const apiKey = credentials.apiKey as string;

				try {
					// Get the selected data source from the data_source_selector field
					const dataSourceSelector = this.getNodeParameter('data_source_selector') as string;

					if (!dataSourceSelector) {
						return [
							{
								name: 'Please Select a Data Source First',
								value: '',
							},
						];
					}

					// Extract data_source_id from "database_id:data_source_id" format
					const [databaseId, dataSourceId] = dataSourceSelector.split(':');

					// Fetch properties for this data source
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/integrations/data-sources/${dataSourceId}/properties?database_id=${databaseId}`,
						headers: {
							'x-api-key': apiKey,
							Accept: 'application/json',
						},
					});

					// Format properties for dropdown
					// Filter out "title" property type since we have a dedicated title field
					const options: INodePropertyOptions[] = response
						.filter((property: { property_type: string }) => property.property_type !== 'title')
						.map(
							(property: {
								property_id: string;
								property_name: string;
								property_type: string;
							}) => ({
								name: `${property.property_name} (${property.property_type})`,
								value: property.property_id,
								description: `Type: ${property.property_type}`,
							}),
						);

					return options;
				} catch (error) {
					console.error('Failed to load properties:', error);
					return [
						{
							name: 'Error Loading Properties',
							value: '',
							description: 'Please check your data source selection and try again',
						},
					];
				}
			},

			/**
			 * Load properties for a specific row (for update operation)
			 * Used by the "Update Row" operation to show available properties
			 */
			async getRowProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('lumifyhubApi');
				const baseUrl = credentials.baseUrl as string;
				const apiKey = credentials.apiKey as string;

				try {
					// Get the row_id from the node parameters
					const rowId = this.getNodeParameter('row_id') as string;

					if (!rowId) {
						return [
							{
								name: 'Please Enter a Row ID First',
								value: '',
							},
						];
					}

					// Fetch properties for this row
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/integrations/rows/${rowId}/properties`,
						headers: {
							'x-api-key': apiKey,
							Accept: 'application/json',
						},
					});

					// Format properties for dropdown (filter out title)
					const options: INodePropertyOptions[] = response
						.filter((property: { property_type: string }) => property.property_type !== 'title')
						.map(
							(property: {
								property_id: string;
								property_name: string;
								property_type: string;
							}) => ({
								name: `${property.property_name} (${property.property_type})`,
								value: property.property_id,
								description: `Type: ${property.property_type}`,
							}),
						);

					return options;
				} catch (error) {
					console.error('Failed to load row properties:', error);
					return [
						{
							name: 'Error Loading Properties',
							value: '',
							description: 'Please check the Row ID and try again',
						},
					];
				}
			},
		},
	};
}
