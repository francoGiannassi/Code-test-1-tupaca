export interface Task {
        id: string;
        name: string;
        description: string;
        status: 'Por hacer' | 'En progreso' | 'Hecho';
        createdAt: Date;
    }