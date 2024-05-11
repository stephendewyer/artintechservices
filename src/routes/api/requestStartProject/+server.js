import { mysqlConnection } from "$lib/server/db/mysql";

export async function POST({request}) {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const artificialIntelligence = data.artificialIntelligence ? 1 : 0;
    const brandIdentityDesign = data.brandIdentityDesign ? 1 : 0;
    const dataVisualization = data.dataVisualization ? 1 : 0;
    const photography = data.photography ? 1 : 0;
    const softwareDevelopment = data.softwareDevelopment ? 1 : 0;
    const userExperienceDesign = data.userExperienceDesign ? 1 : 0;
    const videography = data.videography ? 1 : 0;
    const nameFirst = data.nameFirst;
    const nameLast = data.nameLast;
    const email = data.email;
    const company = data.company;
    const phoneNumber = data.phone;
    const URL = data.url;
    const aboutProject = data.aboutProject;
    const projectStartDate = data.projectStartDate;
    const projectEndDate = data.projectEndDate;
    const projectBudget = data.projectBudget;
    const imageFileInputValue = data.imageFileInputValue;
    const documentFileInputValue = data.documentFileInputValue;
    const documentFileName = data.documentFileName;

    if (
        !nameFirst ||
        !nameLast ||
        !email ||
        !phoneNumber ||
        !aboutProject ||
        !projectStartDate ||
        !projectEndDate ||
        !projectBudget
    ) {
        return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
    };

    if (
        !email.includes('@')
    ) {
        return new Response(JSON.stringify({error: "missing an @ symbol in email address"}), {status: 422});
    };

    let res = await mysqlConnection();

    res.end();
    
}