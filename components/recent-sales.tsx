import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">John Doe</p>
          <p className="text-sm text-muted-foreground truncate">john.doe@example.com</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$1,999.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Jane Lane</p>
          <p className="text-sm text-muted-foreground truncate">jane.lane@example.com</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$3,500.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Robert Kim</p>
          <p className="text-sm text-muted-foreground truncate">robert.kim@example.com</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$2,750.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Sarah Taylor</p>
          <p className="text-sm text-muted-foreground truncate">sarah.taylor@example.com</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$1,250.00</div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium leading-none truncate">Michael Chen</p>
          <p className="text-sm text-muted-foreground truncate">michael.chen@example.com</p>
        </div>
        <div className="ml-auto font-medium whitespace-nowrap">+$4,320.00</div>
      </div>
    </div>
  )
}

