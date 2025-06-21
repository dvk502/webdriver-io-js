export interface AgentPublicDTO {
  agentId: number;
  gender: string;
  birthday: Date;
  status: string;
  loginName: string;
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
  infoDTO: InfoDTO;
  historyDTOList: AgentHistoryDTO[];
  addressDTO: AddressDTO;
  readyToRelocate: boolean;
  fileDTOList: AgentFileDTO[];
  workingTermId: number;
  currentShiftStatusDTO: ShiftStatusDTO;
}

// Определяем связанные интерфейсы:
export interface AgentDocumentDTO {
  // Добавь поля
}

export interface RoleDTO {
  // Добавь поля
}

export interface DepartmentDTO {
  departmentId: number;
  name: string;
  createDate: number;
  createdBy: number;
  orgId: number;
}

export interface PositionDTO {
  positionId: number;
  orgId: number;
  name: string;
  departmentId: number;
  responsibilities: string;
  requirements: string;
  context: string;
  type: string;
  workingTermId: number;
  status: string;
  createDate: number;
  createdBy: number;
  updateDate: number;
  updatedBy: number;
  descriptionLanguageCode: string;
  candidateStatusOption: {
    testManagerInterviewOption: {
      testActive: boolean;
    };
  };
}

export interface AgentPrincipalDTO {
  // Добавь поля
}

export interface AgentTimeApprovingManagerDTO {
  // Добавь поля
}

export interface TeamAgentDTO {
  // Добавь поля
}

export interface ProjectDTO {
  projectId: number;
  orgId: number;
  name: string;
  description: string;
  status: string;
  startDate: number;
  budget: number;
  createDate: number;
  createdBy: number;
  type: string;
  spentTimeMs: number;
  imageBaseUrl: string;
}

export interface ProjectAgentDTO {
  // Добавь поля
}

export interface AgentDayOffSchedulingDTO {
  // Добавь поля
}

export interface ActivitySubscription {
  // Добавь поля
}

export interface AgentContact {
  contactId: number;
  agentId: number;
  orgId: number;
  contactType: string;
  contact: string;
}

export interface AgentLanguage {
  languageId: number;
  agentId: number;
  orgId: number;
  language: string;
  level: string;
}

export interface InfoDTO {
  infoId: number;
  agentId: number;
  phoneNumber: string;
  birthDate: Date;
  gender: string;
  onboardDate: Date;
  additionalInformation: string;
  loginName: string;
  readyToRelocate: boolean;
  vacationResetDate: number;
  probationEndDate: Date; //бек пока не присылает
  intertshipEnd: Date; //бек пока не присылает
}

export interface AgentHistoryDTO {
  // Добавь поля
}

export interface AddressDTO {
  addressId: number;
  orgId: number;
  country: string;
  region: string;
  city: string;
  addressLine1: string;
  createDate: number;
}

export interface AgentFileDTO {
  // Добавь поля
}

export interface ShiftStatusDTO {
  // Добавь поля
}
