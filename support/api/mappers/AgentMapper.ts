import { ApiClasses } from '@api/ApiClasses';
import CommonMethods from '@utils/CommonMethods';

export interface AgentUIModel {
  fullName: string;
  workEmail: string;
  status?: string;
  position?: string;
  department?: string;
  phone?: string;
  telegram?: string;
  contacts?: { contactType: string; contact: string }[];
  skype?: string;
  linkedin?: string;
  facebook?: string;
  emailOther?: string;
  birthDate?: string;
  gender?: string;
  LanguageList?: string[];
  address?: string;
  readyToRelocate?: string;
  onboardDate?: string;
  probationEnd?: string;
  internship?: string;
  additionalInfo?: string;
}

class AgentMapper {
  public static async personalToUIModel(agentId: number): Promise<AgentUIModel> {
    const api = await new ApiClasses();

    const response = await api.profile.getPublicInfoAgent(agentId);

    const languages: string[] =
      response.languageDTOList?.map((lang) => `${lang.language} - ${lang.level}`) || [];

    const contacts =
      response.contactDTOList?.map((cont) => ({
        contactType: cont.contactType,
        contact: cont.contact
      })) || [];

    const birthday = response.infoDTO.birthDate
      ? CommonMethods.formatDate(response.infoDTO.birthDate)
      : undefined;
    const onboard = response.infoDTO.onboardDate
      ? CommonMethods.formatDate(response.infoDTO.onboardDate)
      : undefined;
    const intern = response.infoDTO.intertshipEnd
      ? CommonMethods.formatDate(response.infoDTO.intertshipEnd)
      : undefined;

    return {
      fullName: `${response.firstName} ${response.lastName}`,
      status: response.activeStatus,
      position: response.positionDTO?.name || undefined,
      department: response.departmentDTO.name || undefined,
      workEmail: response.infoDTO.loginName,
      contacts: contacts || undefined,
      gender: response.infoDTO.gender || undefined,
      LanguageList: languages || undefined,
      address:
        `${response.addressDTO.city}, ${response.addressDTO.region}, ${response.addressDTO.country}` ||
        undefined,
      ...(typeof response.infoDTO.readyToRelocate === 'boolean' && {
        readyToRelocate: response.infoDTO.readyToRelocate ? 'Yes' : 'No'
      }),
      additionalInfo: response.infoDTO.additionalInformation || undefined,

      birthDate: birthday,
      onboardDate: onboard,
      internship: intern
    };
  }
}

export default AgentMapper;
