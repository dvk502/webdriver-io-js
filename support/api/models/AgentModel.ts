export interface AgentDTO {
    agentId: number;
    gender: string;
    birthday: number;
    agentDocumentList: AgentDocumentDTO[];
    department: string;
    departmentId: number;
    orgId: number;
    roleList: RoleDTO[];
    firstName: string;
    lastName: string;
    fullName: string;
    teUserId: number;
    teamIdSet: number[];
    projectIdSet: number[];
    roleIdSet: number[];
    timeZone: string;
    departmentDTO: DepartmentDTO;
    roleDTOList: RoleDTO[];
    email: string;
    imageFileName: string;
    imageFileNameWoExt: string;
    imageBaseUrl: string;
    activeStatus: string;
    principalId: number;
    positionId: number;
    positionDTO: PositionDTO;
    departmentName: string;
    agentPrincipalDTO: AgentPrincipalDTO;
    timeApprovingAgentDTOList: AgentTimeApprovingManagerDTO[];
    timeApproveForAgentDTOList: AgentTimeApprovingManagerDTO[];
    teamAgentDTOList: TeamAgentDTO[];
    projectDTOList: ProjectDTO[];
    projectAgentDTOList: ProjectAgentDTO[];
    agentDayOffSchedulingDTOList: AgentDayOffSchedulingDTO[];
    activitySubscriptionManagerDTOList: ActivitySubscription[];
    numberOfDayOffRequests: number;
    approvingTypeSet: string[];
    password: string;
    confirmPassword: string;
    primary: boolean;
    contactDTOList: AgentContact[];
    languageDTOList: AgentLanguage[];
    infoDTO: AgentInfo;
    historyDTOList: AgentHistoryDTO[];
    addressDTO: AddressDTO;
    readyToRelocate: boolean;
    fileDTOList: AgentFileDTO[];
    workingTermId: number;
    currentShiftStatusDTO: ShiftStatusDTO;
  }
  
  // Определяем связанные интерфейсы:
  export interface AgentDocumentDTO {
    // Добавь поля, если они нужны
  }
  
  export interface RoleDTO {
    // Добавь поля, если они нужны
  }
  
  export interface DepartmentDTO {
    // Добавь поля, если они нужны
  }
  
  export interface PositionDTO {
    // Добавь поля, если они нужны
  }
  
  export interface AgentPrincipalDTO {
    // Добавь поля, если они нужны
  }
  
  export interface AgentTimeApprovingManagerDTO {
    // Добавь поля, если они нужны
  }
  
  export interface TeamAgentDTO {
    // Добавь поля, если они нужны
  }
  
  export interface ProjectDTO {
    // Добавь поля, если они нужны
  }
  
  export interface ProjectAgentDTO {
    // Добавь поля, если они нужны
  }
  
  export interface AgentDayOffSchedulingDTO {
    // Добавь поля, если они нужны
  }
  
  export interface ActivitySubscription {
    // Добавь поля, если они нужны
  }
  
  export interface AgentContact {
    // Добавь поля, если они нужны
  }
  
  export interface AgentLanguage {
    // Добавь поля, если они нужны
  }
  
  export interface AgentInfo {
    // Добавь поля, если они нужны
  }
  
  export interface AgentHistoryDTO {
    // Добавь поля, если они нужны
  }
  
  export interface AddressDTO {
    // Добавь поля, если они нужны
  }
  
  export interface AgentFileDTO {
    // Добавь поля, если они нужны
  }
  
  export interface ShiftStatusDTO {
    // Добавь поля, если они нужны
  }