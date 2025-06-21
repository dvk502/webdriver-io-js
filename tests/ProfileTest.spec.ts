import AgentMapper from '@api/mappers/AgentMapper';
import { ApplicationScreens } from '@screens/ApplicationScreens';

describe('Provile tests', () => {
  it('01 Check data profile public agent', async () => {
    const agentData = await AgentMapper.personalToUIModel(221);
    const screens = new ApplicationScreens();
    await screens.login.loginAgent('221');

    await screens.profile.checkFullName(agentData.fullName);
    await screens.profile.checkDepartment(agentData.department);
    await screens.profile.checkStatus(agentData.status);
    await screens.profile.checkWorkEmail(agentData.workEmail);
    await screens.profile.checkDiscord(agentData.discord);
    await screens.profile.checkEmail(agentData.email);
    await screens.profile.checkFacebook(agentData.facebook);
    await screens.profile.checkLinkedin(agentData.linkedin);
    await screens.profile.checkOther(agentData.other);
    await screens.profile.checkPhone(agentData.phone);
    await screens.profile.checkSkype(agentData.skype);
    await screens.profile.checkTelegram(agentData.telegram);
    await screens.profile.checkDiscord(agentData.discord);
    await screens.profile.checkBirthday(agentData.birthDate);
    await screens.profile.checkGender(agentData.gender);
    await screens.profile.checkLanguages(agentData.languageList);
    await screens.profile.checkAddress(agentData.address);
    await screens.profile.checkReadyToRelocate(agentData.readyToRelocate);
    await screens.profile.checkOnboard(agentData.onboardDate);
    await screens.profile.checkInternshipEnd(agentData.internship);
    await screens.profile.checkProbationEnd(agentData.probationEnd);
    await screens.profile.checkAdditionalInformation(agentData.additionalInfo);
  });


});
