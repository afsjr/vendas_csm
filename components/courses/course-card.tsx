import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import type { Course } from "@/lib/types"
import { formatCurrency, formatDate, getCourseLevelLabel, getCourseFormatLabel } from "@/lib/utils"
import Link from "next/link"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const daysUntilStart = Math.ceil(
    (new Date(course.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )
  const daysUntilDeadline = Math.ceil(
    (new Date(course.enrollmentDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <Card className="animate-fade-in hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{course.name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">{getCourseLevelLabel(course.level)}</Badge>
              <Badge variant="outline">{getCourseFormatLabel(course.format)}</Badge>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">{formatCurrency(course.price)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Duração: {course.duration}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            Início: {formatDate(course.startDate)}{" "}
            {daysUntilStart > 0 && <span className="text-green-600">({daysUntilStart} dias)</span>}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            Prazo de inscrição: {formatDate(course.enrollmentDeadline)}{" "}
            {daysUntilDeadline > 0 ? (
              <span className={daysUntilDeadline <= 7 ? "text-red-600" : "text-yellow-600"}>
                ({daysUntilDeadline} dias)
              </span>
            ) : (
              <span className="text-red-600">(Encerrado)</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">12 matrículas</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <DollarSign className="h-4 w-4" />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/cursos/${course.id}`}>Ver Detalhes</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
