import { cn } from "@/lib/utils";


export default function AnnounceBoard({children, className, id}: {children: React.ReactNode, className?: string, id?: string}) {
  return (
    <div id={id} className={cn("flex flex-col gap-4 items-center p-14 bg-blue-400", className)}>
        {children}
    </div>
  )
}
