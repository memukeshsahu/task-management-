export interface TaskListResponse
{
    id:number,
    tittle:string,
    description:string,
    assignedTeamMember:string,
    priority:string,
    dueDate:string,
    status?:string
}
