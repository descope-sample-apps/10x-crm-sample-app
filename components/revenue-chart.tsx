"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 4000,
  },
  {
    name: "Feb",
    revenue: 5200,
  },
  {
    name: "Mar",
    revenue: 4800,
  },
  {
    name: "Apr",
    revenue: 6000,
  },
  {
    name: "May",
    revenue: 7500,
  },
  {
    name: "Jun",
    revenue: 8500,
  },
  {
    name: "Jul",
    revenue: 9800,
  },
  {
    name: "Aug",
    revenue: 8900,
  },
  {
    name: "Sep",
    revenue: 11000,
  },
  {
    name: "Oct",
    revenue: 12000,
  },
  {
    name: "Nov",
    revenue: 14000,
  },
  {
    name: "Dec",
    revenue: 16000,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

