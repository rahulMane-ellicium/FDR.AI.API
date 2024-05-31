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
      console.log(itsmTools[tool]);
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
          itsmTools[tool]["API and Integration Support"]["API access"]
        );

      const {
        recordset: [tool_id],
      } = await request.query(insertToolQuery);
      request
        .input("tool_id", tool_id.ID)
        .input("total_reviews", itsmTools[tool].Ratings["Total Reviews"])
        .input("ease_of_use", itsmTools[tool].Ratings["Ease of Use"])
        .input("Features", itsmTools[tool].Ratings["Features"])
        .input("Design", itsmTools[tool].Ratings["Design"])
        .input("Support", itsmTools[tool].Ratings["Support"])
        .input("Overall", itsmTools[tool].Ratings["Overall"]);

      await request.query(insertRatingsQuery);

      request
        .input(
          "active_directory",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "Active Directory"
          ]
        )
        .input(
          "answer_gpt",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "Answer GPT"
          ]
        )
        .input(
          "assess360",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "Assess360"
          ]
        )
        .input(
          "bigid",
          itsmTools[tool]["API and Integration Support"].Integrations["BigID"]
        )
        .input(
          "cozyroc_ssis_suite",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "Cozyroc SSIS+ Suite"
          ]
        )
        .input(
          "cloudhub",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "CloudHub"
          ]
        )
        .input(
          "exalate",
          itsmTools[tool]["API and Integration Support"].Integrations["Exalate"]
        )
        .input(
          "elastic_observability",
          itsmTools[tool]["API and Integration Support"].Integrations[
            "Elastic Observability"
          ]
        )
        .input(
          "incydr",
          itsmTools[tool]["API and Integration Support"].Integrations["Incydr"]
        )
        .input(
          "nexpose",
          itsmTools[tool]["API and Integration Support"].Integrations["Nexpose"]
        )
        .input(
          "other_available_integrations",
          itsmTools[tool]["API and Integration Support"].Integrations["Other"]
            ? true
            : false
        );

      await request.query(insertIntegrationSupportQuery);

      request
        .input(
          "pricing_tiers",
          itsmTools[tool]["Pricing Details"]["Pricing Tiers"]
        )
        .input(
          "free_version_availability",
          itsmTools[tool]["Pricing Details"]["Free Version Availability"]
        )
        .input(
          "free_trial_availability",
          itsmTools[tool]["Pricing Details"]["Free Trial Availability"]
        );
      await request.query(insertPricingDetails);

      request
        .input("saas", itsmTools[tool]["Deployment Support"].SaaS)
        .input("iphone", itsmTools[tool]["Deployment Support"].iPhone)
        .input("ipad", itsmTools[tool]["Deployment Support"].iPad)
        .input("android", itsmTools[tool]["Deployment Support"].Android)
        .input("windows", itsmTools[tool]["Deployment Support"].Windows)
        .input("mac", itsmTools[tool]["Deployment Support"].Mac)
        .input("linux", itsmTools[tool]["Deployment Support"].Linux);

      await request.query(insertDeploymentSupportQuery);

      request
        .input(
          "phone_support",
          itsmTools[tool]["Customer Support Options"]["Phone Support"]
        )
        .input(
          "live_support",
          itsmTools[tool]["Customer Support Options"]["24/7 Live Support"]
        )
        .input(
          "online_support",
          itsmTools[tool]["Customer Support Options"]["Online Support"]
        );

      await request.query(insertCustomerSupportQuery);

      request
        .input(
          "company_name",
          itsmTools[tool]["Vendor Details"]["Company Name"]
        )
        .input(
          "year_founded",
          itsmTools[tool]["Vendor Details"]["Year Founded"]
        )
        .input("country", itsmTools[tool]["Vendor Details"].Country);

      await request.query(insertVendorQuery);

      request
        .input(
          "documentation",
          itsmTools[tool]["Training Platforms"].Documentation
        )
        .input("webinars", itsmTools[tool]["Training Platforms"].Webinars)
        .input(
          "live_online_sessions",
          itsmTools[tool]["Training Platforms"]["Live Online Sessions"]
        )
        .input(
          "in_person_training",
          itsmTools[tool]["Training Platforms"]["In-Person Training"]
        );

      await request.query(insertTrainingPlatformQuery);
      for (let feature of itsmTools[tool].Features) {
        request.replaceInput("feature_name",mssql.VarChar,feature);

        await request.query(insertFeatures);
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  saveItsmTools,
};
