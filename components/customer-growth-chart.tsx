"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  {
    name: "Jan",
    customers: 10,
  },
  {
    name: "Feb",
    customers: 18,
  },
  {
    name: "Mar",
    customers: 25,
  },
  {
    name: "Apr",
    customers: 32,
  },
  {
    name: "May",
    customers: 45,
  },
  {
    name: "Jun",
    customers: 58,
  },
  {
    name: "Jul",
    customers: 72,
  },
  {
    name: "Aug",
    customers: 85,
  },
  {
    name: "Sep",
    customers: 98,
  },
  {
    name: "Oct",
    customers: 110,
  },
  {
    name: "Nov",
    customers: 120,
  },
  {
    name: "Dec",
    customers: 128,
  },
]

export function CustomerGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

