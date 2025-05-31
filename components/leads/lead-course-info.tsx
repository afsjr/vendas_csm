import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, DollarSign } from "lucide-react"
import type { Lead } from "@/lib/types"
import { mockCourses } from "@/lib/mock-data"
import { formatCurrency, formatDate, getCourseLevelLabel, getCourseFormatLabel } from "@/lib/utils"

interface LeadCourseInfoProps {
  lead: Lead
}

export function LeadCourseInfo({ lead }: LeadCourseInfoProps) {
  // Encontrar os cursos completos baseados nos IDs de interesse
  const interestedCoursesDetails = lead.interestedCourses.map((interest) => {
    const course = mockCourses.find((c) => c.id === interest.courseId)
    return {
      ...interest,
      course,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interesses Educacionais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Áreas de Interesse</p>
          <div className="flex flex-wrap gap-2">
            {lead.interestAreas.map((area, index) => (
              <Badge key={index} variant="outline">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Tipos de Curso Preferidos</p>
          <div className="flex flex-wrap gap-2">
            {lead.preferredCourseTypes.map((type, index) => (
              <Badge key={index} variant="outline">
                {getCourseLevelLabel(type)}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Formato Preferido</p>
          <div className="flex flex-wrap gap-2">
            {lead.preferredFormat.map((format, index) => (
              <Badge key={index} variant="outline">
                {getCourseFormatLabel(format)}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Cursos de Interesse</p>
          {interestedCoursesDetails.length > 0 ? (
            <div className="space-y-4">
              {interestedCoursesDetails.map((item, index) =>
                item.course ? (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{item.courseName}</h4>
                      <Badge
                        className={
                          item.interestLevel === "alto"
                            ? "bg-green-100 text-green-800"
                            : item.interestLevel === "medio"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        Interesse {item.interestLevel}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {getCourseLevelLabel(item.course.level)} • {getCourseFormatLabel(item.course.format)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Início: {formatDate(item.course.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{formatCurrency(item.course.price)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium">{item.courseName}</h4>
                    <p className="text-sm text-muted-foreground">Detalhes do curso não disponíveis</p>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum curso de interesse registrado</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
