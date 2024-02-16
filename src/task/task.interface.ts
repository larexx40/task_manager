export interface Task {
    _id?: string;
    userId: string;
    name: string;
    description: string;
    isComplete: boolean; 
    startDate: Date;
    endDate: Date;
}

