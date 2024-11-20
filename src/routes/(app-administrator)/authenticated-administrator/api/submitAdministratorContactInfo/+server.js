import { mysqlConnection } from "$lib/server/db/mysql";
import { htmlEntities } from "$lib/util/htmlEntities.js";

export const POST = async ({request}) => {

    if (request.method !== "POST") {
        return new Response(JSON.stringify({error: "method is not POST"}), {status: 422});
    };

    const data = await request.json();

    const { 
        emailInputValue,
        userNameInputValue,
        nameFirstInputValue,
        nameLastInputValue,
        phoneInputValue,
        streetAddressInputValue,
        streetAddress02InputValue,
        cityInputValue,
        stateInputValue,
        zipCodeInputValue,
        countryInputValue
    } = data;

    if (!emailInputValue) {
        return new Response(JSON.stringify({error: "missing valid session email"}), {status: 422});
    } else if (
        !userNameInputValue ||
        !nameFirstInputValue ||
        !nameLastInputValue ||
        !phoneInputValue ||
        !streetAddressInputValue ||
        !cityInputValue ||
        !stateInputValue ||
        !zipCodeInputValue ||
        !countryInputValue
    ) {
        return new Response(JSON.stringify({error: "missing required form data"}), {status: 422});
    };

    // update administrator row

    const updateAdministratorStatement = `UPDATE administrators
        SET 
            username = "${htmlEntities(userNameInputValue)}"
        WHERE email = "${emailInputValue}";
    `;

    let res = await mysqlConnection();

    let administratorID;

    await res.query(updateAdministratorStatement)
    .then(([]) => {
        console.log("updated administrator row")
    })
    .catch(error => {
        throw error;
    });

    // get the ID from the administrator row

    const selectAdministratorIDStatement = `SELECT ID FROM administrators WHERE email = "${emailInputValue}";`

    await res.query(selectAdministratorIDStatement)
    .then(([rows]) => {
        administratorID = JSON.parse(JSON.stringify(rows))[0].ID;
    })
    .catch(error => {
        throw error;
    });
    
    // check to see if administrator_information row already exists

    const selectAdministratorInformationRowStatement = `SELECT * FROM administrator_information WHERE admin_ID = ${administratorID}`;

    /**
     * @type {never[]}
     */
    let administratorInformationRow = [];
    await res.query(selectAdministratorInformationRowStatement)
    .then(([rows]) => {
        administratorInformationRow = JSON.parse(JSON.stringify(rows));
    })
    .catch(error => {
        throw error;
    });
    
    if (administratorInformationRow.length > 0) {
        // administrator_information row exists, proceed to update

        const updateAdministratorInformationStatement = `UPDATE administrator_information
            SET 
                name_first = "${htmlEntities(nameFirstInputValue)}",
                name_last = "${htmlEntities(nameLastInputValue)}",
                phone_number = "${phoneInputValue}",
                street_address = "${htmlEntities(streetAddressInputValue)}",
                street_address_02 = "${htmlEntities(streetAddress02InputValue)}",
                city = "${htmlEntities(cityInputValue)}",
                state = "${htmlEntities(stateInputValue)}",
                zip_code = "${zipCodeInputValue}",
                country = "${countryInputValue}"
            WHERE admin_ID = ${administratorID};
        `;
        await res.query(updateAdministratorInformationStatement)
        .then(([]) => {
            console.log("updated administrator_information row")
        })
        .catch(error => {
            throw error;
        });
    } else if (administratorInformationRow.length === 0) {
        // insert administrator_information row

        const insertOrUpdateAdministratorInformationRowStatement = `INSERT INTO administrator_information (
                admin_ID,
                name_first,
                name_last,
                phone_number,
                street_address,
                street_address_02,
                city,
                state,
                zip_code,
                country
            ) VALUES ( 
                ${administratorID},
                "${htmlEntities(nameFirstInputValue)}",
                "${htmlEntities(nameLastInputValue)}",
                "${phoneInputValue}",
                "${htmlEntities(streetAddressInputValue)}",
                "${htmlEntities(streetAddress02InputValue)}",
                "${htmlEntities(cityInputValue)}",
                "${htmlEntities(stateInputValue)}",
                "${zipCodeInputValue}",
                "${countryInputValue}"
            );
        `;
        await res.query(insertOrUpdateAdministratorInformationRowStatement)
        .then(([]) => {
            console.log("administrator_information row added")
        })
        .catch(error => {
            throw error;
        });
    }

    res.end();

    return new Response(JSON.stringify({success: "administrator information saved"}), {status: 200});
}