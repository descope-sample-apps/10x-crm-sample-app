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
  phone: string
  address: string
  notes: string
  created_at: string
  avatar: string
}

export const customers: Customer[] = [
  {
    id: "c1",
    name: "John Doe",
    email: "john.doe@acme.com",
    company: "Acme Inc",
    status: "active",
    lastContact: "2024-01-25",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    notes: "CTO, technical decision maker, prefers email communication",
    created_at: "2023-12-15T10:00:00Z",
    avatar: getAvatarUrl("John Doe")
  },
  {
    id: "c2",
    name: "Jane Lane",
    email: "jane.lane@globex.com",
    company: "Globex Corp",
    status: "active",
    lastContact: "2024-01-22",
    phone: "+1 (555) 234-5678",
    address: "456 Market St, San Francisco, CA 94105",
    notes: "VP of Engineering, focused on security and compliance",
    created_at: "2023-12-10T09:00:00Z",
    avatar: getAvatarUrl("Jane Lane")
  },
  {
    id: "c3",
    name: "Michael Chen",
    email: "michael.chen@techcorp.com",
    company: "TechCorp Solutions",
    status: "active",
    lastContact: "2024-01-20",
    phone: "+1 (555) 345-6789",
    address: "789 Mission St, San Francisco, CA 94105",
    notes: "Director of IT, evaluating cloud solutions",
    created_at: "2023-12-05T11:00:00Z",
    avatar: getAvatarUrl("Michael Chen")
  },
  {
    id: "c4",
    name: "Sarah Johnson",
    email: "sarah.j@innovate.com",
    company: "Innovate Tech",
    status: "active",
    lastContact: "2024-01-18",
    phone: "+1 (555) 456-7890",
    address: "321 Tech Blvd, San Jose, CA 95112",
    notes: "CEO, interested in AI solutions",
    created_at: "2023-12-20T14:00:00Z",
    avatar: getAvatarUrl("Sarah Johnson")
  },
  {
    id: "c5",
    name: "David Wilson",
    email: "david.w@enterprise.com",
    company: "Enterprise Systems",
    status: "active",
    lastContact: "2024-01-15",
    phone: "+1 (555) 567-8901",
    address: "555 Enterprise Way, Palo Alto, CA 94301",
    notes: "CIO, looking for enterprise-wide solutions",
    created_at: "2023-12-25T16:00:00Z",
    avatar: getAvatarUrl("David Wilson")
  }
]

// Deal Owners data
export interface DealOwner {
  id: string
  name: string
  email: string
  position: string
  avatar: string
  created_at: string
}

export const dealOwners: DealOwner[] = [
  {
    id: "o1",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    position: "Senior Account Executive",
    avatar: getAvatarUrl("Alex Johnson"),
    created_at: "2023-01-01T10:00:00Z"
  },
  {
    id: "o2",
    name: "Sam Wilson",
    email: "sam.wilson@company.com",
    position: "Account Manager",
    avatar: getAvatarUrl("Sam Wilson"),
    created_at: "2023-01-05T09:00:00Z"
  },
  {
    id: "o3",
    name: "Sarah Martinez",
    email: "sarah.martinez@company.com",
    position: "Senior Account Executive",
    avatar: getAvatarUrl("Sarah Martinez"),
    created_at: "2023-01-10T08:00:00Z"
  }
]

// Deals data
export interface Deal {
  id: string
  name: string
  value: number
  stage: string
  customerId: string
  ownerId: string
  expectedCloseDate: string
  probability: number
  created_at: string
  notes?: string
}

export const deals: Deal[] = [
  {
    id: "1",
    name: "Enterprise Software License",
    value: 150000,
    stage: "proposal",
    customerId: "c1",
    ownerId: "o1",
    expectedCloseDate: "2025-12-15",
    probability: 75,
    created_at: "2024-01-01T00:00:00Z",
    notes: "Enterprise license for 500 users, includes premium support"
  },
  {
    id: "2",
    name: "Cloud Migration Project",
    value: 250000,
    stage: "negotiation",
    customerId: "c2",
    ownerId: "o2",
    expectedCloseDate: "2026-01-15",
    probability: 60,
    created_at: "2024-01-02T00:00:00Z",
    notes: "Full cloud migration with security compliance requirements"
  },
  {
    id: "3",
    name: "IT Infrastructure Upgrade",
    value: 80000,
    stage: "discovery",
    customerId: "c3",
    ownerId: "o3",
    expectedCloseDate: "2026-02-01",
    probability: 40,
    created_at: "2024-01-10T00:00:00Z",
    notes: "Hardware refresh and software upgrade project"
  },
  {
    id: "4",
    name: "AI Implementation Project",
    value: 350000,
    stage: "proposal",
    customerId: "c4",
    ownerId: "o2",
    expectedCloseDate: "2026-01-30",
    probability: 70,
    created_at: "2024-01-05T00:00:00Z",
    notes: "Enterprise AI solution implementation"
  },
  {
    id: "5",
    name: "Digital Transformation Initiative",
    value: 500000,
    stage: "discovery",
    customerId: "c5",
    ownerId: "o1",
    expectedCloseDate: "2026-03-01",
    probability: 30,
    created_at: "2024-01-08T00:00:00Z",
    notes: "Comprehensive digital transformation program"
  }
]

// Activities data
export interface Activity {
  id: string
  type: string
  customer: string
  customerId: string
  dealId: string
  date: string
  notes: string
  completed: boolean
}

export const activities: Activity[] = [
  // Deal 1 Activities
  {
    id: "a1",
    type: "call",
    customer: "John Doe",
    customerId: "c1",
    dealId: "1",
    date: "2024-01-15",
    notes: "Initial discovery call - discussed requirements and timeline",
    completed: true
  },
  {
    id: "a2",
    type: "meeting",
    customer: "John Doe",
    customerId: "c1",
    dealId: "1",
    date: "2024-01-20",
    notes: "Product demo with technical team",
    completed: true
  },
  {
    id: "a3",
    type: "email",
    customer: "John Doe",
    customerId: "c1",
    dealId: "1",
    date: "2024-01-25",
    notes: "Sent proposal and pricing details",
    completed: true
  },
  // Deal 2 Activities
  {
    id: "a4",
    type: "call",
    customer: "Jane Lane",
    customerId: "c2",
    dealId: "2",
    date: "2024-01-10",
    notes: "Initial consultation - discussed cloud migration needs",
    completed: true
  },
  {
    id: "a5",
    type: "meeting",
    customer: "Jane Lane",
    customerId: "c2",
    dealId: "2",
    date: "2024-01-18",
    notes: "Security compliance review meeting",
    completed: true
  },
  {
    id: "a6",
    type: "task",
    customer: "Jane Lane",
    customerId: "c2",
    dealId: "2",
    date: "2024-01-22",
    notes: "Prepare custom security documentation",
    completed: false
  },
  // Deal 3 Activities
  {
    id: "a7",
    type: "call",
    customer: "Michael Chen",
    customerId: "c3",
    dealId: "3",
    date: "2024-01-12",
    notes: "Initial discussion about infrastructure needs",
    completed: true
  },
  {
    id: "a8",
    type: "meeting",
    customer: "Michael Chen",
    customerId: "c3",
    dealId: "3",
    date: "2024-01-19",
    notes: "Site visit to assess current infrastructure",
    completed: true
  }
]

// Tasks data
export interface Task {
  id: string
  title: string
  description: string
  dealId: string
  dealOwnerId: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  assignee?: string
  created_at: string
}

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Prepare Enterprise License Contract",
    description: "Draft and review contract documents for the Enterprise Software License deal",
    dealId: "1",
    dealOwnerId: "o1",
    dueDate: "2025-12-10",
    priority: "high",
    status: "in-progress",
    assignee: "Legal Team",
    created_at: "2024-01-20T09:00:00Z"
  },
  {
    id: "t2",
    title: "Schedule Technical Demo",
    description: "Arrange technical demonstration for Acme Inc's engineering team",
    dealId: "1",
    dealOwnerId: "o1",
    dueDate: "2025-11-15",
    priority: "medium",
    status: "todo",
    assignee: "Sales Team",
    created_at: "2024-01-22T10:00:00Z"
  },
  {
    id: "t3",
    title: "Security compliance documentation",
    description: "Prepare security compliance documentation for Cloud Migration Project",
    dealId: "2",
    dealOwnerId: "o2",
    dueDate: "2026-01-10",
    priority: "high",
    status: "todo",
    created_at: "2024-01-25T10:00:00Z"
  },
  {
    id: "t4",
    title: "Migration Planning Workshop",
    description: "Conduct migration planning workshop with Globex Corp's IT team",
    dealId: "2",
    dealOwnerId: "o2",
    dueDate: "2025-12-20",
    priority: "high",
    status: "in-progress",
    assignee: "Technical Team",
    created_at: "2024-01-28T11:00:00Z"
  },
  {
    id: "t5",
    title: "Infrastructure Assessment Report",
    description: "Complete infrastructure assessment report for TechCorp Solutions",
    dealId: "3",
    dealOwnerId: "o1",
    dueDate: "2026-01-15",
    priority: "medium",
    status: "in-progress",
    assignee: "Technical Team",
    created_at: "2024-01-19T11:00:00Z"
  },
  {
    id: "t6",
    title: "Hardware Requirements Analysis",
    description: "Analyze and document hardware requirements for the upgrade",
    dealId: "3",
    dealOwnerId: "o1",
    dueDate: "2026-01-28",
    priority: "medium",
    status: "todo",
    assignee: "Technical Team",
    created_at: "2024-01-30T14:00:00Z"
  },
  {
    id: "t7",
    title: "AI Solution Architecture Review",
    description: "Review and finalize AI solution architecture with Innovate Tech",
    dealId: "4",
    dealOwnerId: "o2",
    dueDate: "2026-01-15",
    priority: "high",
    status: "todo",
    assignee: "AI Team",
    created_at: "2024-01-15T09:00:00Z"
  },
  {
    id: "t8",
    title: "Data Integration Planning",
    description: "Plan data integration strategy for AI implementation",
    dealId: "4",
    dealOwnerId: "o2",
    dueDate: "2026-01-25",
    priority: "high",
    status: "in-progress",
    assignee: "Data Team",
    created_at: "2024-01-18T10:00:00Z"
  },
  {
    id: "t9",
    title: "Digital Strategy Workshop",
    description: "Conduct digital strategy workshop with Enterprise Systems",
    dealId: "5",
    dealOwnerId: "o1",
    dueDate: "2026-02-10",
    priority: "high",
    status: "completed",
    assignee: "Strategy Team",
    created_at: "2024-01-10T09:00:00Z"
  },
  {
    id: "t10",
    title: "Transformation Roadmap Development",
    description: "Develop detailed transformation roadmap",
    dealId: "5",
    dealOwnerId: "o1",
    dueDate: "2026-02-25",
    priority: "high",
    status: "in-progress",
    assignee: "Strategy Team",
    created_at: "2024-01-12T11:00:00Z"
  }
]

