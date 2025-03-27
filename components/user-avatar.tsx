import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  image?: string | null
}

export function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={image || getAvatarUrl(name)} alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
} 