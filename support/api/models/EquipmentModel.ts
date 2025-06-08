import { AgentDTO } from "./AgentModel";

export interface EquipmentFilter {
    equipmentId: number;
    orgId: number;
    linkedHistoryId: number;
    inventoryNumber: string;
    serialNumber: string;
    name: string;
    type: string;
    status: string;
    updateStatus: string;
    condition: string;
    locationId: number;
    holderId: number;
    description: string;
    priceAmount: number;
    priceCurrency: string;
    departmentName: string;
    createDate: Date; // Instant заменен на Date
    createdBy: number;
    orderByIdAsc: boolean;
    orderByIdDesc: boolean;
    orderByNameAsc: boolean;
    orderByPriceAmountAsc: boolean;
    orderByPriceAmountDesc: boolean;
    orderByPriceCurrencyAsc: boolean;
    orderByPriceCurrencyDesc: boolean;
    pageNumber: number;
    limitOnPage: number;
    locationTypeId: number; // long заменен на number
    locationCity: string;
    locationRoom: string;
    nameILike: string;
    inventoryNumberILike: string;
    departmentNameSet: Set<string>;
    equipmentIdSet: Set<number>; // Long заменен на number
    statusSet: Set<EquipmentStatus>;
    holderIdSet: Set<number>; // Long заменен на number
  }
  
  export interface EquipmentDTO {
    equipmentId: number;
    orgId: number;
    linkedHistoryId: number;
    inventoryNumber: string;
    serialNumber: string;
    name: string;
    type: string;
    status: string;
    updateStatus: string;
    condition: string;
    locationId: number;
    holderId: number;
    description: string;
    priceAmount: number;
    priceCurrency: string;
    departmentName: string;
    createDate: Date; // Instant заменен на Date
    createdBy: number;
    returnDate: Date; // Instant заменен на Date
    updateReason: string;
    updateComment: string;
    linkedEquipmentHistoryDTO: EquipmentHistoryDTO;
    previousEquipmentHistoryDTO: EquipmentHistoryDTO;
    equipmentLocationDTO: EquipmentLocationDTO;
    equipmentFileDTOList: EquipmentFileDTO[];
    relatedFileEquipmentDTOList: EquipmentDTO[];
  }
  
  export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }
  
  export interface EquipmentHistoryDTO {
    historyId: number;
    prevHistoryId: number;
    orgId: number;
    equipmentId: number;
    status: string;
    condition: string;
    locationId: number;
    holderId: number;
    priceAmount: number;
    departmentName: string;
    priceCurrency: string;
    returnDate: Date; // Instant заменен на Date
    updateType: string;
    updateDate: Date; // Instant заменен на Date
    updatedBy: number;
    updateComment: string;
    updateReason: string;
    associativeFileList: EquipmentEquipmentFile[];
    updatedByAgentDTO: AgentDTO;
    equipmentLocationDTO: EquipmentLocationDTO;
  }
  
  export interface EquipmentEquipmentFile {
    // Добавь поля, если они нужны
  }
  
 
  export interface EquipmentLocationDTO {
    // Добавь поля, если они нужны
  }
  
  export interface EquipmentLocationDTO {
    // Добавь поля, если они нужны
  }
  
  export interface EquipmentFileDTO {
    // Добавь поля, если они нужны
  }
  
  export type EquipmentStatus = string; // Если это перечисление, можно заменить на enum

  export interface HolderAgentDTO {
    agentId: number;
    firstName: string;
    lastName: string;
    activeStatus: string;
    status: string;
    departmentId: number;
    orgId: number;
    fullName: string;
  }
  
  export interface EquipmentLocationTypeDTO {
    typeId: number;
    orgId: number;
    refId: number;
    refType: string;
    type: string;
    active: boolean;
  }
  
  export interface EquipmentLocationDTO {
    locationId: number;
    orgId: number;
    typeId: number;
    city: string;
    room: string;
    createDate: Date; // Число заменено на Date для удобства работы с датами
    createdBy: number;
    equipmentLocationTypeDTO: EquipmentLocationTypeDTO;
  }
  
  export interface EquipmentFileDTO {
    fileId: number;
    orgId: number;
    equipmentId: number;
    name: string;
    createDate: Date; // Число заменено на Date
    createdBy: number;
  }