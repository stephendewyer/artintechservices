import { mysqlConnection } from "$lib/server/db/mysql";
import { htmlEntities } from "$lib/util/htmlEntities.js";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();
    // console.log(data);
    const { 
        clientEmail,
        nameFirstInputValue,
        nameLastInputValue,
        emailInputValue,
        companyInputValue,
        phoneInputValue,
        URLInputValue,
        streetAddressInputValue,
        streetAddress02InputValue,
        cityInputValue,
        stateInputValue,
        zipCodeInputValue,
        countryInputValue
    } = data;

    if (!clientEmail) {
        return new Response(JSON.stringify({error: "missing valid session email"}), {status: 422});
    } else if (
        !nameFirstInputValue ||
        !nameLastInputValue ||
        !emailInputValue ||
        !phoneInputValue ||
        !streetAddressInputValue ||
        !cityInputValue ||
        !stateInputValue ||
        !zipCodeInputValue ||
        !countryInputValue
    ) {
        return new Response(JSON.stringify({error: "missing required form data"}), {status: 422});
    };

    // update client row

    const updateClientStatement = `UPDATE clients
        SET 
            name_first = "${htmlEntities(nameFirstInputValue)}",
            name_last = "${htmlEntities(nameLastInputValue)}"
        WHERE email = "${clientEmail}";
    `;

    let res = await mysqlConnection();

    let clientID;

    await res.query(updateClientStatement)
    .then(([]) => {
        console.log("updated client row")
    })
    .catch(error => {
        throw error;
    });

    // get the user_ID from the client row

    const selectClientUserIDStatement = `SELECT user_ID FROM clients WHERE email = "${clientEmail}";`

    await res.query(selectClientUserIDStatement)
    .then(([rows]) => {
        clientID = JSON.parse(JSON.stringify(rows))[0].user_ID;
    })
    .catch(error => {
        throw error;
    });
    
    // check to see if client_information row already exists

    const selectClientInformationRowStatement = `SELECT * FROM client_information WHERE client_ID = ${clientID}`;

    /**
     * @type {never[]}
     */
    let clientInformationRow = [];
    await res.query(selectClientInformationRowStatement)
    .then(([rows]) => {
        clientInformationRow = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });
    
    if (clientInformationRow.length > 0) {
        // client_information row exists, proceed to update

        const updateClientInformationStatement = `UPDATE client_information
            SET 
                company = "${htmlEntities(companyInputValue)}",
                phone_number = "${phoneInputValue}",
                URL = "${htmlEntities(URLInputValue)}",
                street_address = "${htmlEntities(streetAddressInputValue)}",
                street_address_02 = "${htmlEntities(streetAddress02InputValue)}",
                city = "${htmlEntities(cityInputValue)}",
                state = "${htmlEntities(stateInputValue)}",
                zip_code = "${zipCodeInputValue}",
                country = "${countryInputValue}"
            WHERE client_ID = "${clientID}";
        `;
        await res.query(updateClientInformationStatement)
        .then(([]) => {
            console.log("updated client_information row")
        })
        .catch(error => {
            throw error;
        });
    } else if (clientInformationRow.length === 0) {
        // insert client_information row

        const insertOrUpdateClientInformationRowStatement = `INSERT INTO client_information (
                client_ID,
                company,
                phone_number,
                URL,
                street_address,
                street_address_02,
                city,
                state,
                zip_code,
                country
            ) VALUES ( 
                ${clientID},
                "${htmlEntities(companyInputValue)}",
                "${phoneInputValue}",
                "${htmlEntities(URLInputValue)}",
                "${htmlEntities(streetAddressInputValue)}",
                "${htmlEntities(streetAddress02InputValue)}",
                "${htmlEntities(cityInputValue)}",
                "${htmlEntities(stateInputValue)}",
                "${zipCodeInputValue}",
                "${countryInputValue}"
            );
        `;
        await res.query(insertOrUpdateClientInformationRowStatement)
        .then(([]) => {
            console.log("client_information row added")
        })
        .catch(error => {
            throw error;
        });
    }

    res.end();

    return new Response(JSON.stringify({success: "contact information saved"}), {status: 200});
}