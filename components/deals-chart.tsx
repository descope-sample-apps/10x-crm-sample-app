"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Qualified", value: 25 },
  { name: "Proposal", value: 15 },
  { name: "Negotiation", value: 10 },
  { name: "Closed Won", value: 20 },
  { name: "Closed Lost", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"]

export function DealsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart margin={{ top: 20, right: 30, bottom: 50, left: 30 }}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} deals`, null]} />
        <Legend 
          verticalAlign="bottom" 
          height={50}
          layout="horizontal"
          align="center"
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

