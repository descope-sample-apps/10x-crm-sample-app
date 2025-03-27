export interface Contact {
  id: string
  name: string
  email: string
  company: string
  tenant_id: string
  created_at: string
  last_contact: string
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
    tenant_id: "tenant1",
    created_at: "2024-01-01T00:00:00Z",
    last_contact: "2024-01-01"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Tech Corp",
    tenant_id: "tenant1",
    created_at: "2024-01-02T00:00:00Z",
    last_contact: "2024-01-02"
  },
  // Add more dummy contacts as needed
]; 