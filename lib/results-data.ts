import { supabase } from "@/lib/supabase"

export type ResultEntry = {
  id: string
  name: string
  exam: string
  rank: string
  rankNum: number
  branch: string
  year: string
  isFeatured: boolean
}

function parseRankNum(rank: string | null): number {
  if (!rank) return 999
  const match = rank.match(/\d+/)
  return match ? parseInt(match[0], 10) : 999
}

function mapResult(row: Record<string, unknown>): ResultEntry {
  const rank = (row.rank as string) || ""
  return {
    id: row.id as string,
    name: row.student_name as string,
    exam: row.exam as string,
    rank,
    rankNum: parseRankNum(rank),
    branch: (row.branch as string) || "",
    year: (row.batch_year as string) || "",
    isFeatured: Boolean(row.is_featured),
  }
}

const STATIC: ResultEntry[] = [
  { id: "1", name: "Rahul Sharma", exam: "NDA", rank: "AIR 12", rankNum: 12, branch: "Indian Army", year: "2025", isFeatured: false },
  { id: "2", name: "Sneha Patel", exam: "AFCAT", rank: "AIR 8", rankNum: 8, branch: "Indian Air Force", year: "2025", isFeatured: false },
  { id: "3", name: "Priya Singh", exam: "CDS", rank: "AIR 28", rankNum: 28, branch: "Indian Air Force", year: "2025", isFeatured: false },
  { id: "4", name: "Amit Kumar", exam: "NDA", rank: "AIR 45", rankNum: 45, branch: "Indian Navy", year: "2025", isFeatured: false },
  { id: "5", name: "Anjali Mishra", exam: "CDS", rank: "AIR 34", rankNum: 34, branch: "Indian Army", year: "2025", isFeatured: false },
  { id: "6", name: "Vikram Yadav", exam: "NDA", rank: "AIR 67", rankNum: 67, branch: "Indian Army", year: "2025", isFeatured: false },
  { id: "7", name: "Arjun Reddy", exam: "NDA", rank: "AIR 5", rankNum: 5, branch: "Indian Air Force", year: "2024", isFeatured: true },
  { id: "8", name: "Sanjay Gupta", exam: "AFCAT", rank: "AIR 11", rankNum: 11, branch: "Indian Air Force", year: "2024", isFeatured: false },
  { id: "9", name: "Kavita Sharma", exam: "CDS", rank: "AIR 19", rankNum: 19, branch: "Indian Army", year: "2024", isFeatured: false },
  { id: "10", name: "Ritu Agarwal", exam: "AFCAT", rank: "AIR 15", rankNum: 15, branch: "Indian Air Force", year: "2024", isFeatured: false },
  { id: "11", name: "Pooja Kumari", exam: "CDS", rank: "AIR 27", rankNum: 27, branch: "Indian Air Force", year: "2024", isFeatured: false },
  { id: "12", name: "Neha Verma", exam: "NDA", rank: "AIR 38", rankNum: 38, branch: "Indian Navy", year: "2024", isFeatured: false },
  { id: "13", name: "Rohan Joshi", exam: "NDA", rank: "AIR 52", rankNum: 52, branch: "Indian Army", year: "2024", isFeatured: false },
  { id: "14", name: "Deepak Singh", exam: "NDA", rank: "AIR 73", rankNum: 73, branch: "Indian Army", year: "2024", isFeatured: false },
  { id: "15", name: "Manish Tiwari", exam: "NDA", rank: "AIR 3", rankNum: 3, branch: "Indian Air Force", year: "2023", isFeatured: true },
  { id: "16", name: "Priyanka Rao", exam: "AFCAT", rank: "AIR 7", rankNum: 7, branch: "Indian Air Force", year: "2023", isFeatured: true },
  { id: "17", name: "Swati Pandey", exam: "CDS", rank: "AIR 14", rankNum: 14, branch: "Indian Army", year: "2023", isFeatured: false },
  { id: "18", name: "Karan Malhotra", exam: "NDA", rank: "AIR 22", rankNum: 22, branch: "Indian Navy", year: "2023", isFeatured: false },
  { id: "19", name: "Megha Sinha", exam: "CDS", rank: "AIR 31", rankNum: 31, branch: "Indian Army", year: "2023", isFeatured: false },
  { id: "20", name: "Ashish Dubey", exam: "NDA", rank: "AIR 41", rankNum: 41, branch: "Indian Army", year: "2023", isFeatured: false },
]

export async function getResults(): Promise<ResultEntry[]> {
  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .order("sort_order")

    if (error || !data?.length) return STATIC
    return data.map(mapResult)
  } catch {
    return STATIC
  }
}

export async function getResultsByYear(): Promise<Record<string, ResultEntry[]>> {
  const results = await getResults()
  const grouped: Record<string, ResultEntry[]> = {}
  for (const r of results) {
    const year = r.year || "Other"
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(r)
  }
  for (const year of Object.keys(grouped)) {
    grouped[year].sort((a, b) => a.rankNum - b.rankNum)
  }
  return grouped
}

export async function getFeaturedResults(): Promise<ResultEntry[]> {
  const results = await getResults()
  return results.filter((r) => r.isFeatured).sort((a, b) => a.rankNum - b.rankNum).slice(0, 3)
}
