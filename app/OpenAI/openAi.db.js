import { pool } from "../connection/sql.connect.js";

const getItsmData = async (arrayGptOutput) => {
  try {

    const query = `select ta.*,rt.*,pd.*,ds.*,cs.*,tp.*,vd.*,ft.*,isu.* from tools ta
    join ratings rt on rt.tool_id = ta.tool_id
   join pricing_details pd on pd.tool_id = ta.tool_id     
   join deployment_support ds on ds.tool_id = ta.tool_id
   join customer_support_options cs on cs.tool_id = ta.tool_id
   join training_platforms tp on tp.tool_id = ta.tool_id
   join vendor_details vd on vd.tool_id = ta.tool_id
   join features ft on ft.tool_id = ta.tool_id
   join integration_support isu on isu.tool_id = ta.tool_id
   where ta.name in (${arrayGptOutput.map((_, index) => `@name${index}`).join(",")})`;

    const request = pool.request();
    
    arrayGptOutput.forEach((name, index) => {
        request.input(`name${index}`, name);
    });
    
    const {recordset} = await request.query(query);
  
    const data = await convertObject(recordset);
  
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const convertObject = async (toolsArray) => {
  try {
    const convertedTools = {};

    toolsArray.forEach((tool) => {
      const {
        name,
        total_reviews,
        ease_of_use,
        features,
        design,
        support,
        overall,
        api_access,
        pricing_tiers,
        free_version_availability,
        free_trial_availability,
        saas,
        iphone,
        ipad,
        android,
        windows,
        mac,
        linux,
        phone_support,
        live_support,
        online_support,
        documentation,
        webinars,
        live_online_sessions,
        in_person_training,
        company_name,
        year_founded,
        country,
        feature_name,
        active_directory,
        answer_gpt,
        assess360,
        bigid,
        cozyroc_ssis_suite,
        cloudhub,
        elastic_observability,
        exalate,
        incydr,
        nexpose,
        other_available_integrations,
      } = tool;
        
      if (!convertedTools[name]) {
        
        convertedTools[name] = {
          ratings: {
            total_reviews,
            ease_of_use,
            features,
            design,
            support,
            overall,
          },
          
          api_and_integration_support: {
            api_access,
            integration_support: {
              "Active Directory": active_directory,
              "Answer GPT": answer_gpt,
              Assess360: assess360,
              BigID: bigid,
              "Cozyroc SSIS+ Suite": cozyroc_ssis_suite,
              CloudHub: cloudhub,
              "Elastic Observability": elastic_observability,
              Exalate: exalate,
              Incydr: incydr,
              Nexpose: nexpose,
              "Other available integrations": other_available_integrations,
            },
          },
          pricing_details: {
            pricing_tiers,
            free_version_availability,
            free_trial_availability,
          },
          deployment_support: {
            SaaS: saas,
            iPhone: iphone,
            iPad: ipad,
            Android: android,
            Windows: windows,
            Mac: mac,
            Linux: linux,
          },
          customer_support_options: {
            phone_support,
            "24/7_live_support": live_support,
            online_support,
          },
          training_platforms: {
            documentation,
            webinars,
            live_online_sessions,
            in_person_training,
          },
          vendor_details: {
            company_name,
            year_founded,
            country,
          },
          features: [feature_name],
        };
       
      } 
      else {
        convertedTools[name].features.push(feature_name);        
      }
    });

    return convertedTools;
  } catch (error) {
    console.log(error);
    throw error;
  }
};





export default {
    getItsmData
}