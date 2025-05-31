"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCourse, getMatriculations } from "@/lib/data-service"
import type { Course, Matriculation } from "@/lib/types"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [matriculations, setMatriculations] = useState<Matriculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("info")

  const courseId = params.id as string

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [courseData, matriculationsData] = await Promise.all([
          getCourse(courseId),
          getMatriculations(),
        ])
        setCourse(courseData)

// Filter
