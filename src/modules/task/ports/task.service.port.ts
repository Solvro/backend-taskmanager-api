export interface TaskServicePort {
  hasProject: (projectId: string, userId: string) => Promise<boolean>;
}
