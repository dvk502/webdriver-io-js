export interface PreAuthRequest {
  userName: string;
  password: string;
}

export interface PreAuthResponse {
  token: string;
  primary: boolean;
  organizationDTOS: {
    orgId: number;
    orgName: string;
    createDate: number;
  }[];
}

export interface AuthResponse {
  token: string;
  agentId: number;
  firstName: string;
  lastName: string;
  imageBaseUrl: string;
  orgId: number;
  departmentId: number;
  orgName: string;
  timeZone: string;
  authorities: string[];
  primary: boolean;
  projectIdList: number[];
  keyRole: boolean;
}