export type Employee = {
    readonly id: number;
    name: string;
    salary: number;
    currency: 'USD';
    department: string;
    sub_department: string;
    on_contract?: boolean;
}

export type SummaryStats = {
    mean: number;
    min: number;
    max: number;
}

export interface DepartmentStats {
    department: string;
    stats?: SummaryStats;
}

export interface SubDepartmentStats extends DepartmentStats {
    sub_department: string;
}

export interface DepartmentEmployees {
    [key: string]: Employee[]
}

export interface SubdepartmentEmployees {
    [key: string]: { [key: string]: Employee[] }
}