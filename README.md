# n8n-nodes-lumifyhub

This is an n8n community node. It lets you use [LumifyHub](https://lumifyhub.io) in your n8n workflows.

LumifyHub is a collaborative workspace platform for creating and managing pages, notes, databases, and knowledge bases with your team.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) •
[Operations](#operations) •
[Credentials](#credentials) •
[Compatibility](#compatibility) •
[Usage](#usage) •
[Example Workflows](#example-workflows) •
[Troubleshooting](#troubleshooting) •
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Installation

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install** and enter `n8n-nodes-lumifyhub`
3. Agree to the risks and select **Install**
4. The node will appear in your nodes panel

### Manual Installation

To install manually using npm:

```bash
npm install n8n-nodes-lumifyhub
```

## Operations

### Page Resource

- **Create**: Create a new page in your LumifyHub workspace

## Credentials

To use this node, you need to create API credentials in your LumifyHub workspace:

### Prerequisites

1. Have an active LumifyHub account at [lumifyhub.io](https://lumifyhub.io)
2. Be an owner of a workspace (only workspace owners can generate API keys)

### Setup Instructions

1. Log in to your LumifyHub account
2. Navigate to your workspace settings
3. Go to the **Integrations** tab
4. Click **Generate API Key**
5. (Optional) Give your API key a descriptive name (e.g., "n8n Integration")
6. Copy the generated API key - **you won't be able to see it again**

### Configuring in n8n

1. In n8n, create a new credential of type **Lumifyhub API**
2. Paste your API key into the **API Key** field
3. (Optional) For local development, change the **Base URL** to `http://localhost:3000/api/v1`
4. Save the credential

**Notes**:
- The workspace ID is automatically determined from your API key, so you don't need to provide it separately
- The Base URL defaults to production (`https://lumifyhub.io/api/v1`) but can be changed for local development or self-hosted instances

## Compatibility

- Minimum n8n version: `1.0.0`
- Tested against n8n versions: `1.0.0+`

## Usage

### Creating a Page

The **Create Page** operation allows you to create new pages in your LumifyHub workspace from any workflow.

#### Required Fields

- **Title**: The title of the page (max 255 characters)

#### Optional Fields

- **Content**: The content of the page (plain text, max 1MB)
- **Parent Page ID**: Create the page as a child of another page (leave empty for root-level)
- **Icon**: An emoji icon for the page (e.g., 📄, 📝, 💡)
- **Cover Image URL**: A URL to an image to use as the page cover

#### Dynamic Data

You can use n8n's expression system to inject data from previous nodes:

```
Title: {{$json["subject"]}}
Content: {{$json["body"]}}
```

## Local Development Testing

If you're testing against a local LumifyHub development server:

1. Start your local LumifyHub server: `npm run dev` (typically runs on `http://localhost:3000`)
2. Generate an API key from your local instance's workspace settings
3. In n8n credentials, set:
   - **API Key**: Your local API key
   - **Base URL**: `http://localhost:3000/api/v1`
4. Test the Create Page operation

This allows you to develop and test n8n workflows against your local LumifyHub instance before deploying to production.

## Example Workflows

### 1. Email to LumifyHub

Automatically create pages from incoming emails:

1. **Email Trigger** - Receives emails
2. **Lumifyhub** - Creates page with:
   - Title: `{{$json["subject"]}}`
   - Content: `{{$json["text"]}}`

### 2. Slack to LumifyHub

Save important Slack messages as pages:

1. **Slack Trigger** - New message in channel
2. **Filter** - Only messages with specific reaction
3. **Lumifyhub** - Creates page with:
   - Title: `Slack: {{$json["user"]}} - {{$json["ts"]}}`
   - Content: `{{$json["text"]}}`
   - Icon: 💬

### 3. Webhook to LumifyHub

Create pages from external form submissions:

1. **Webhook Trigger** - Receives form data
2. **Lumifyhub** - Creates page with:
   - Title: `{{$json["form_title"]}}`
   - Content: `{{$json["form_content"]}}`
   - Parent Page ID: `{{$json["project_id"]}}`

### 4. RSS to Knowledge Base

Automatically save RSS feed items:

1. **RSS Read** - Fetch RSS feed
2. **Lumifyhub** - For each item, create page with:
   - Title: `{{$json["title"]}}`
   - Content: `{{$json["content"]}}\n\nSource: {{$json["link"]}}`

## Troubleshooting

### Authentication Failed

**Error**: `Authentication failed: Invalid API key`

**Solutions**:
- Verify your API key is correct (no extra spaces)
- Check that the API key hasn't been revoked
- Ensure you're using the correct workspace
- Regenerate a new API key if needed

### Page Creation Failed

**Error**: `Failed to create page: Invalid parent_page_id`

**Solutions**:
- Verify the parent page ID exists and belongs to your workspace
- Leave parent_page_id empty to create a root-level page
- Ensure you have permission to create pages in this workspace

**Error**: `Failed to create page: Title is required`

**Solutions**:
- Ensure the Title field is not empty
- Check that your expression is evaluating to a string
- Verify the data from previous nodes is available

### Content Too Large

**Error**: `Content exceeds maximum size of 1MB`

**Solutions**:
- Reduce the content size
- Split content across multiple pages
- Consider storing large content externally and linking to it

### Rate Limiting

**Error**: `Too many requests`

**Solutions**:
- Add a delay between requests using the Wait node
- Reduce workflow execution frequency
- Contact LumifyHub support for higher rate limits

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [LumifyHub Documentation](https://docs.lumifyhub.io)
- [LumifyHub n8n Integration Guide](https://docs.lumifyhub.io/integrations/n8n)
- [LumifyHub API Documentation](https://docs.lumifyhub.io/api)
- [Report issues](https://github.com/lumifyhub/n8n-nodes-lumifyhub/issues)

## Version History

### 0.1.0 (Initial Release)

- ✨ Create pages in LumifyHub workspaces
- 🔑 API key authentication
- 📝 Plain text content support
- 🎨 Icon and cover image support
- 📂 Parent page support for nested pages

## License

MIT

## Support

For issues, questions, or feature requests:

- GitHub Issues: [n8n-nodes-lumifyhub/issues](https://github.com/lumifyhub/n8n-nodes-lumifyhub/issues)
- Email: support@lumifyhub.io
- Documentation: [docs.lumifyhub.io](https://docs.lumifyhub.io)
