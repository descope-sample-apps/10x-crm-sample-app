"use client"

import { ResponsiveContainer, Tooltip, Funnel, FunnelChart, LabelList } from "recharts"

const data = [
  {
    name: "Leads",
    value: 120,
    fill: "#0ea5e9",
  },
  {
    name: "Qualified",
    value: 80,
    fill: "#22c55e",
  },
  {
    name: "Proposal",
    value: 60,
    fill: "#eab308",
  },
  {
    name: "Negotiation",
    value: 40,
    fill: "#f97316",
  },
  {
    name: "Closed Won",
    value: 36,
    fill: "#10b981",
  },
]

export function DealsFunnel() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <FunnelChart>
        <Tooltip />
        <Funnel dataKey="value" data={data} isAnimationActive>
          <LabelList position="right" fill="#888888" stroke="none" dataKey="name" />
          <LabelList position="right" fill="#888888" stroke="none" dataKey="value" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}

