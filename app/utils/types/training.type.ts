import type {Group} from "~/utils/types/group.type";

export interface Training {
    formationId: string
    label: string
    shortLabel: string
    dateDebut: string
    dateFin: string
    groups: Group[]
    totalStudents: number
}