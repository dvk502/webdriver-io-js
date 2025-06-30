export enum ScheduleType {
  SickLeave = 'Sick Leave',
  Vacation = 'Vacation',
  DayOff = 'Day Off'
}

export enum Status {
  Requested = 'Requested',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export interface DayOffSchedulingResponse extends Array<DayOffSchedulingItem> {}

export interface DayOffSchedulingItem {
  dayOffSchedulingId: number;
  orgId: number;
  agentId: number;
  scheduleType: ScheduleType;
  dateFrom: number;
  dateTo: number;
  scheduledQuantity: number;
  comment: string;
  status: Status;
  createDate: number;
  createdBy: number;
  approvingDate: number;
  approvingAgentId: number;
  agentDTO: AgentDTO;
  fileDTOList: FileDTO[]; 
  historyDTOList: HistoryDTO[];
}

export interface AgentDTO {
  agentId: number;
  firstName: string;
  lastName: string;
  activeStatus: 'Active' | string;
  status: string;
  departmentId: number;
  departmentName: string;
  fullName: string;
}

export interface HistoryDTO {
  message: string;
  details: string;
  createDate: number;
  createdBy: number;
  dayOffSchedulingId: number;
  status: Status; 
  orgId: number;
  createdByAgentFullName: string;
}

export interface FileDTO {
  // Структура не указана
}
