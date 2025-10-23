import type {ClassGroup} from "~/utils/types/class_group.type";

export interface Training {
    id: number
    displayName: string
    totalStudents: number
    dateDebut: string
    dateFin: string
    active: boolean,
    classGroups: ClassGroup[]
}