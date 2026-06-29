export interface TaskListResponse
{
    id:number,
    tittle:string,
    description:string,
    assignedteammember:string,
    priority:string,
    dueDate:string,
    status?:string
}