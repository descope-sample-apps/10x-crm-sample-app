"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 250000,
    open: 80000,
  },
  {
    name: "Feb",
    total: 320000,
    open: 120000,
  },
  {
    name: "Mar",
    total: 280000,
    open: 100000,
  },
  {
    name: "Apr",
    total: 410000,
    open: 210000,
  },
  {
    name: "May",
    total: 460000,
    open: 180000,
  },
  {
    name: "Jun",
    total: 540000,
    open: 260000,
  },
]

export function Overview() {
  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={50}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              name === 'total' ? 'Revenue' : 'Open Opportunities'
            ]}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingTop: '0px' }}
            layout="horizontal"
            align="center"
          />
          <Bar 
            dataKey="total" 
            name="Revenue" 
            fill="#b287d5" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={30}
          />
          <Bar 
            dataKey="open" 
            name="Open Opportunities" 
            fill="#619972" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

