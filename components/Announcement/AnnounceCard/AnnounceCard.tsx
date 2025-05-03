import { Calendar } from "lucide-react"

export default function AnnounceCard({title, content, writer, date}: {title: string, content: string, writer: string, date: number}) {
  return (
    <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="short-par">
            {content}
        </div>
        <div className="flex justify-between items-center">
            <div>نویسنده: {writer}</div>
            <div className="flex items-center gap-1">
                <Calendar size={24} />
                {new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
            </div>
        </div>
    </div>
  )
}
