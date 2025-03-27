// Dummy data for the CRM application

import { getAvatarUrl } from "@/lib/utils"

// Customers data
export interface Customer {
  id: string
  name: string
  email: string
  company: string
  status: string
  lastContact: string
  value: number
  phone: string
  address: string
  notes: string
  tenant_id: string
  created_at: string
  avatar: string
}

export const customers: Customer[] = [
    {
      id: "c1",
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Acme Inc",
      status: "active",
      lastContact: "2023-03-15",
      value: 25000,
      phone: "+1 (555) 123-4567",
      address: "123 Main St, San Francisco, CA 94105",
      notes: "Key decision maker, prefers email communication",
      tenant_id: "tenant1",
      created_at: "2023-03-15T10:00:00Z",
      avatar: getAvatarUrl("John Doe")
    },
    {
      id: "c2",
      name: "Jane Lane",
      email: "jane.lane@example.com",
      company: "Globex Corp",
      status: "active",
      lastContact: "2023-03-10",
      value: 42000,
      phone: "+1 (555) 234-5678",
      address: "456 Market St, San Francisco, CA 94105",
      notes: "Interested in premium plan, follow up next quarter",
      tenant_id: "tenant1",
      created_at: "2023-03-10T09:00:00Z",
      avatar: getAvatarUrl("Jane Lane")
    },
    {
      id: "c3",
      name: "Robert Kim",
      email: "robert.kim@example.com",
      company: "Initech",
      status: "inactive",
      lastContact: "2023-02-28",
      value: 18000,
      phone: "+1 (555) 345-6789",
      address: "789 Mission St, San Francisco, CA 94105",
      notes: "Budget constraints, revisit in Q3",
      tenant_id: "tenant1",
      created_at: "2023-02-28T10:00:00Z",
      avatar: getAvatarUrl("Robert Kim")
    },
    {
      id: "c4",
      name: "Sarah Taylor",
      email: "sarah.taylor@example.com",
      company: "Massive Dynamic",
      status: "active",
      lastContact: "2023-03-12",
      value: 65000,
      phone: "+1 (555) 456-7890",
      address: "101 California St, San Francisco, CA 94111",
      notes: "Expanding team, potential for upsell",
      tenant_id: "tenant1",
      created_at: "2023-03-12T09:00:00Z",
      avatar: getAvatarUrl("Sarah Taylor")
    },
    {
      id: "c5",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      company: "Stark Industries",
      status: "active",
      lastContact: "2023-03-08",
      value: 120000,
      phone: "+1 (555) 567-8901",
      address: "1 Embarcadero Center, San Francisco, CA 94111",
      notes: "Enterprise client, quarterly review scheduled",
      tenant_id: "tenant1",
      created_at: "2023-03-08T09:00:00Z",
      avatar: getAvatarUrl("Michael Chen")
    },
    {
      id: "c6",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      company: "Wayne Enterprises",
      status: "inactive",
      lastContact: "2023-02-15",
      value: 35000,
      phone: "+1 (555) 678-9012",
      address: "555 Montgomery St, San Francisco, CA 94111",
      notes: "On hold due to restructuring",
      tenant_id: "tenant1",
      created_at: "2023-02-15T09:00:00Z",
      avatar: getAvatarUrl("Emily Johnson")
    },
    {
      id: "c7",
      name: "David Wilson",
      email: "david.wilson@example.com",
      company: "Umbrella Corp",
      status: "churned",
      lastContact: "2023-01-20",
      value: 0,
      phone: "+1 (555) 789-0123",
      address: "201 Spear St, San Francisco, CA 94105",
      notes: "Switched to competitor, exit interview scheduled",
      tenant_id: "tenant1",
      created_at: "2023-01-20T09:00:00Z",
      avatar: getAvatarUrl("David Wilson")
    },
    {
      id: "c8",
      name: "Lisa Brown",
      email: "lisa.brown@example.com",
      company: "Cyberdyne Systems",
      status: "active",
      lastContact: "2023-03-14",
      value: 85000,
      phone: "+1 (555) 890-1234",
      address: "50 Fremont St, San Francisco, CA 94105",
      notes: "Interested in AI features, demo scheduled",
      tenant_id: "tenant1",
      created_at: "2023-03-14T09:00:00Z",
      avatar: getAvatarUrl("Lisa Brown")
    },
  ]
  
  // Deals data
  export interface Deal {
    id: string
    name: string
    value: number
    stage: string
    customerId: string
    expectedCloseDate: string
    probability: number
    created_at: string
    notes?: string
  }
  
  export const dummyDeals: Deal[] = [
    {
      id: "1",
      name: "Big Sale",
      value: 10000,
      stage: "proposal",
      customerId: "c1",
      expectedCloseDate: "2024-03-15",
      probability: 75,
      created_at: "2024-01-01T00:00:00Z",
      notes: "Key opportunity with potential for expansion"
    },
    {
      id: "2",
      name: "Medium Deal",
      value: 5000,
      stage: "negotiation",
      customerId: "c2",
      expectedCloseDate: "2024-04-01",
      probability: 50,
      created_at: "2024-01-02T00:00:00Z"
    }
  ]
  
  // Activities data
  export interface Activity {
    id: string
    type: string
    customer: string
    customerId: string
    date: string
    notes: string
    completed: boolean
  }
  
  export const activities: Activity[] = [
    {
      id: "a1",
      type: "call",
      customer: "John Doe",
      customerId: "c1",
      date: "2023-03-15",
      notes: "Discussed renewal options, client interested in multi-year contract",
      completed: true,
    },
    {
      id: "a2",
      type: "email",
      customer: "Jane Lane",
      customerId: "c2",
      date: "2023-03-10",
      notes: "Sent proposal for premium plan upgrade",
      completed: true,
    },
    {
      id: "a3",
      type: "meeting",
      customer: "Michael Chen",
      customerId: "c5",
      date: "2023-03-08",
      notes: "Quarterly review, client satisfied with current implementation",
      completed: true,
    },
    {
      id: "a4",
      type: "task",
      customer: "Sarah Taylor",
      customerId: "c4",
      date: "2023-03-20",
      notes: "Prepare implementation plan for team expansion",
      completed: false,
    },
    {
      id: "a5",
      type: "call",
      customer: "Lisa Brown",
      customerId: "c8",
      date: "2023-03-25",
      notes: "Schedule demo for AI features",
      completed: false,
    },
    {
      id: "a6",
      type: "email",
      customer: "Robert Kim",
      customerId: "c3",
      date: "2023-04-05",
      notes: "Follow up on basic package proposal",
      completed: false,
    },
    {
      id: "a7",
      type: "meeting",
      customer: "Michael Chen",
      customerId: "c5",
      date: "2023-04-10",
      notes: "Technical evaluation of enterprise solution",
      completed: false,
    },
  ]
  
  