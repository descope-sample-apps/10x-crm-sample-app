"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
    deals: 4,
  },
  {
    name: "Feb",
    total: 2100,
    deals: 7,
  },
  {
    name: "Mar",
    total: 1800,
    deals: 5,
  },
  {
    name: "Apr",
    total: 2400,
    deals: 8,
  },
  {
    name: "May",
    total: 3200,
    deals: 12,
  },
  {
    name: "Jun",
    total: 2900,
    deals: 9,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
        <Legend />
        <Bar dataKey="total" name="Revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="deals" name="Deals Closed" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

