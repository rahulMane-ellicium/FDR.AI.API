import { pool } from "../connection/sql.connect.js";
import mssql from 'mssql'

const { SQL_SCHEMA } = process.env;

const saveItsmTools = async (itsmTools) => {
  try {
    // Define the delete queries in the order required by foreign key constraints
    const deleteQueries = [
      `DELETE FROM ratings;`,
      `DELETE FROM integration_support;`,
      `DELETE FROM pricing_details;`,
      `DELETE FROM deployment_support;`,
      `DELETE FROM customer_support_options;`,
      `DELETE FROM training_platforms;`,
      `DELETE FROM vendor_details;`,
      `DELETE FROM features;`,
      `DELETE FROM tools;`,
    ];

    // Execute delete queries in the specified order
    for (const query of deleteQueries) {
      await pool.request().query(query);
    }

    // Now insert the new data for each tool
    for (let tool in itsmTools) {
      
      const insertToolQuery = `
          DECLARE @InsertedID TABLE (ID INT);
          INSERT INTO ${SQL_SCHEMA}.tools (name, api_access)
          OUTPUT INSERTED.tool_id INTO @InsertedID
          VALUES (@name, @api_access);
          SELECT ID FROM @InsertedID;
        `;

      const insertRatingsQuery = `INSERT INTO ${SQL_SCHEMA}.ratings 
        (tool_id,total_reviews,ease_of_use,features,design,support,overall)
        VALUES (@tool_id,@total_reviews,@ease_of_use,@features,@design,@support,@overall)`;

      const insertIntegrationSupportQuery = `INSERT INTO ${SQL_SCHEMA}.integration_support 
      (tool_id,active_directory,answer_gpt,assess360,bigid,cozyroc_ssis_suite,cloudhub,elastic_observability,exalate,incydr,nexpose,other_available_integrations)
      VALUES (@tool_id,@active_directory,@answer_gpt,@assess360,@bigid,@cozyroc_ssis_suite,@cloudhub,@elastic_observability,@exalate,@incydr,@nexpose,@other_available_integrations);`;

      const insertPricingDetails = `INSERT INTO ${SQL_SCHEMA}.pricing_details 
      (tool_id,pricing_tiers,free_version_availability,free_trial_availability)
      VALUES (@tool_id,@pricing_tiers,@free_version_availability,@free_trial_availability);`;

      const insertDeploymentSupportQuery = `INSERT INTO ${SQL_SCHEMA}.deployment_support 
      (tool_id,saas,iphone,ipad,android,windows,mac,linux)
      VALUES (@tool_id,@saas,@iphone,@ipad,@android,@windows,@mac,@linux);`;

      const insertCustomerSupportQuery = `INSERT INTO ${SQL_SCHEMA}.customer_support_options 
      (tool_id,phone_support,live_support,online_support)
      VALUES (@tool_id,@phone_support,@live_support,@online_support)`;

      const insertVendorQuery = `INSERT INTO ${SQL_SCHEMA}.vendor_details 
      (tool_id,company_name,year_founded,country)
      VALUES (@tool_id,@company_name,@year_founded,@country);`;

      const insertTrainingPlatformQuery = `INSERT INTO ${SQL_SCHEMA}.training_platforms 
      (tool_id,documentation,webinars,live_online_sessions,in_person_training)
      VALUES (@tool_id,@documentation,@webinars,@live_online_sessions,@in_person_training);`;

      const insertFeatures = `INSERT INTO ${SQL_SCHEMA}.features 
      (tool_id,feature_name) 
      VALUES (@tool_id,@feature_name);`;

      const request = pool.request();
      request
        .input("name", tool)
        .input(
          "api_access",
          itsmTools[tool].api_and_integration_support.api_access
        );

      const {
        recordset: [tool_id],
      } = await request.query(insertToolQuery);
      request
        .input("tool_id", tool_id.ID)
        .input("total_reviews", itsmTools[tool].ratings.total_reviews)
        .input("ease_of_use", itsmTools[tool].ratings.ease_of_use)
        .input("features", itsmTools[tool].ratings.features)
        .input("design", itsmTools[tool].ratings.design)
        .input("support", itsmTools[tool].ratings.support)
        .input("overall", itsmTools[tool].ratings.overall);

      await request.query(insertRatingsQuery);

      request
        .input(
          "active_directory",
          itsmTools[tool].api_and_integration_support.integration_support.active_directory
        )
        .input(
          "answer_gpt",
          itsmTools[tool].api_and_integration_support.integration_support.answer_gpt
        )
        .input(
          "assess360",
          itsmTools[tool].api_and_integration_support.integration_support.assess360
        )
        .input(
          "bigid",
          itsmTools[tool].api_and_integration_support.integration_support.bigid
        )
        .input(
          "cozyroc_ssis_suite",
          itsmTools[tool].api_and_integration_support.integration_support.cozyroc_ssis_suite
        )
        .input(
          "cloudhub",
          itsmTools[tool].api_and_integration_support.integration_support.cloudhub
        )
        .input(
          "exalate",
          itsmTools[tool].api_and_integration_support.integration_support.exalate
        )
        .input(
          "elastic_observability",
          itsmTools[tool].api_and_integration_support.integration_support.elastic_observability
        )
        .input(
          "incydr",
          itsmTools[tool].api_and_integration_support.integration_support.incydr
        )
        .input(
          "nexpose",
          itsmTools[tool].api_and_integration_support.integration_support.nexpose
        )
        .input(
          "other_available_integrations",
          itsmTools[tool].api_and_integration_support.integration_support.other_available_integrations
            ? true
            : false
        );

      await request.query(insertIntegrationSupportQuery);

      request
        .input(
          "pricing_tiers",
          itsmTools[tool].pricing_details.pricing_tiers
        )
        .input(
          "free_version_availability",
          itsmTools[tool].pricing_details.free_version_availability
        )
        .input(
          "free_trial_availability",
          itsmTools[tool].pricing_details.free_trial_availability
        );
      await request.query(insertPricingDetails);

      request
        .input("saas", itsmTools[tool].deployment_support.saas)
        .input("iphone", itsmTools[tool].deployment_support.iphone)
        .input("ipad", itsmTools[tool].deployment_support.ipad)
        .input("android", itsmTools[tool].deployment_support.android)
        .input("windows", itsmTools[tool].deployment_support.windows)
        .input("mac", itsmTools[tool].deployment_support.mac)
        .input("linux", itsmTools[tool].deployment_support.linux);

      await request.query(insertDeploymentSupportQuery);

      request
        .input(
          "phone_support",
          itsmTools[tool].customer_support_options.phone_support
        )
        .input(
          "live_support",
          itsmTools[tool].customer_support_options.live_support
        )
        .input(
          "online_support",
          itsmTools[tool].customer_support_options.online_support
        );

      await request.query(insertCustomerSupportQuery);

      request
        .input(   
          "company_name",
          itsmTools[tool].vendor_details.company_name
        )
        .input(
          "year_founded",
          itsmTools[tool].vendor_details.year_founded
        )
        .input("country", itsmTools[tool].vendor_details.country);

      await request.query(insertVendorQuery);

      request
        .input(
          "documentation",
          itsmTools[tool].training_platforms.documentation
        )
        .input("webinars", itsmTools[tool].training_platforms.webinars)
        .input(
          "live_online_sessions",
          itsmTools[tool].training_platforms.live_online_sessions
        )
        .input(
          "in_person_training",
          itsmTools[tool].training_platforms.in_person_training
        );

      await request.query(insertTrainingPlatformQuery);
      for (let feature of itsmTools[tool].features) {
        request.replaceInput("feature_name",mssql.VarChar,feature);

        await request.query(insertFeatures);
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};




const getLatestTimeStamp = async () => {
  try {
    const getLatestTimeStampQuery = `SELECT TOP 1 created_at 
    FROM ${SQL_SCHEMA}.tools
    ORDER BY created_at DESC;`;
    const request = pool.request();
    const result = await request.query(getLatestTimeStampQuery);

    const output = result.recordset[0].created_at;

    // Convert the output to a JavaScript Date object
    const date = new Date(output);

    // Format the time using the provided function
    const formatReadableTime = (date) => {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC' // Use UTC to avoid time zone issues
      };
      return date.toLocaleTimeString('en-US', options);
    };

    const formattedTime = formatReadableTime(date);

    // Remove AM/PM from the formatted time and adjust for 12-hour format without AM/PM
    const [time, period] = formattedTime.split(' ');
    const [hours, minutes, seconds] = time.split(':');

    let adjustedHours = parseInt(hours);
    if (period === 'PM' && adjustedHours !== 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && adjustedHours === 12) {
      adjustedHours = 0;
    }

    const finalTime = `${String(adjustedHours).padStart(2, '0')}:${minutes}:${seconds}`;

    // Format the date part
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

    // Combine the date and time into the final output
    const finalOutput = `${formattedDate} ${finalTime}`;

    return finalOutput;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export default {
  saveItsmTools,
  getLatestTimeStamp
};

