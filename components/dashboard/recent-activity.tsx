import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity({ activities }: { activities: any[] }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="text-sm text-muted-foreground text-center py-4">
                Nenhuma atividade recente.
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
                            {activity.type === 'question' ? 'Q' : 'C'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                            {activity.description}
                        </p>
                    </div>
                    <div className={`ml-auto font-medium ${activity.status === 'correct' ? 'text-green-600' :
                            activity.status === 'incorrect' ? 'text-red-600' : 'text-primary'
                        }`}>
                        {activity.points}
                    </div>
                </div>
            ))}
        </div>
    )
}
