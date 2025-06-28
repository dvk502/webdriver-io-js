import { ApiClasses } from '@api/ApiClasses';
import CommonMethods from '@utils/CommonMethods';

export interface AgentPublicUIModel {
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
  other?: string;
  workDiscordID?: string;
  discord?: string;
  facebook?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  languageList?: string[];
  address?: string;
  readyToRelocate?: string;
  onboardDate?: string;
  probationEnd?: string;
  internship?: string;
  additionalInfo?: string;
}

class AgentMapper {
  public static async personalToUIModel(agentId: number): Promise<AgentPublicUIModel> {
    const api = new ApiClasses();

    const response = await api.profile.getPublicInfoAgent(agentId);

    const languages: string[] =
      response.languageDTOList?.map((lang) => `${lang.language} - ${lang.level}`) || [];

    const contacts = response.contactDTOList || [];

    const getContact = (type: string): string | undefined =>
      contacts.find((c) => c.contactType === type)?.contact;

    const birthday = response.infoDTO.birthDate
      ? CommonMethods.format(response.infoDTO.birthDate)
      : undefined;
    const onboard = response.infoDTO.onboardDate
      ? CommonMethods.format(response.infoDTO.onboardDate)
      : undefined;
    const probation = response.infoDTO.probationEndDate
      ? CommonMethods.format(response.infoDTO.probationEndDate)
      : undefined;
    const intern = response.infoDTO.intertshipEnd
      ? CommonMethods.format(response.infoDTO.intertshipEnd)
      : undefined;

    return {
      fullName: `${response.firstName} ${response.lastName}`,
      status: response.status,
      position: response.positionDTO?.name || undefined,
      department: response.departmentDTO.name || undefined,
      workEmail: response.loginName,
      // Явные поля из contacts
      email: getContact('Email'),
      telegram: getContact('Telegram'),
      phone: getContact('Phone'),
      skype: getContact('Skype'),
      linkedin: getContact('Linkedin'),
      other: getContact('Other'),
      facebook: getContact('Facebook'),
      discord: getContact('Discord'),
      workDiscordID: getContact('Work Discord ID'),
      gender: response.infoDTO.gender || undefined,
      languageList: languages || undefined,
      address:
        `${response.addressDTO.city}, ${response.addressDTO.region}, ${response.addressDTO.country}` ||
        undefined,
      ...(typeof response.infoDTO.readyToRelocate === 'boolean' && {
        readyToRelocate: response.infoDTO.readyToRelocate ? 'Yes' : 'No'
      }),
      additionalInfo: response.infoDTO.additionalInformation || undefined,

      birthDate: birthday,
      onboardDate: onboard,
      probationEnd: probation,
      internship: intern
    };
  }
}

export default AgentMapper;
