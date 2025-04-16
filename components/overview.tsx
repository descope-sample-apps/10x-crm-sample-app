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
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-muted-foreground"
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis
            className="text-muted-foreground"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={50}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              name === 'total' ? 'Revenue' : 'Opportunities'
            ]}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))'
            }}
            cursor={{ fill: 'hsl(var(--muted))' }}
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
            fill="#ff7654" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={30}
            activeBar={{ fill: "#ff7654" }}
            className="dark:fill-[#ff642e] dark:active:fill-[#ff642e]"
          />
          <Bar 
            dataKey="open" 
            name="Opportunities" 
            fill="#CB2800" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={30}
            activeBar={{ fill: "#CB2800" }}
            className="dark:fill-[#ffb8a2] dark:active:fill-[#ffb8a2]"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

