import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Acme Corp</p>
          <p className="text-sm text-muted-foreground truncate">Enterprise Software License</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$45,000.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">TechCorp Solutions</p>
          <p className="text-sm text-muted-foreground truncate">Cloud Services Package</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$32,500.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>GI</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Global Industries</p>
          <p className="text-sm text-muted-foreground truncate">Consulting Services</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$28,750.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Data Systems Inc</p>
          <p className="text-sm text-muted-foreground truncate">Data Analytics Platform</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$52,000.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>FI</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Future Innovations</p>
          <p className="text-sm text-muted-foreground truncate">AI Implementation</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$68,000.00</div>
      </div>
    </div>
  )
}

