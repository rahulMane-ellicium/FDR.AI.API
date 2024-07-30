
CREATE TABLE ITSM.dbo.tools (
	tool_id int IDENTITY(1,1) NOT NULL,
	name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	api_access bit NOT NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate()	,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Tools__28DE264FD7928DDF PRIMARY KEY (tool_id)
);


-- ITSM.dbo.customer_support_options definition

-- Drop table

-- DROP TABLE ITSM.dbo.customer_support_options;

CREATE TABLE ITSM.dbo.customer_support_options (
	support_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	phone_support bit NULL,
	live_support bit NULL,
	online_support bit NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Customer__2FBE20909C537954 PRIMARY KEY (support_id),
	CONSTRAINT FK__CustomerS__tool___5629CD9C FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.deployment_support definition

-- Drop table

-- DROP TABLE ITSM.dbo.deployment_support;

CREATE TABLE ITSM.dbo.deployment_support (
	deployment_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	saas bit NULL,
	iphone bit NULL,
	ipad bit NULL,
	android bit NULL,
	windows bit NULL,
	mac bit NULL,
	linux bit NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Deployme__ECBA6DF3C516C7D3 PRIMARY KEY (deployment_id),
	CONSTRAINT FK__Deploymen__tool___5070F446 FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.features definition

-- Drop table

-- DROP TABLE ITSM.dbo.features;

CREATE TABLE ITSM.dbo.features (
	feature_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	feature_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Features__7906CBD72BDEF3E1 PRIMARY KEY (feature_id),
	CONSTRAINT FK__Features__tool_i__6754599E FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.integration_support definition

-- Drop table

-- DROP TABLE ITSM.dbo.integration_support;

CREATE TABLE ITSM.dbo.integration_support (
	integration_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	active_directory bit NULL,
	answer_gpt bit NULL,
	assess360 bit NULL,
	bigid bit NULL,
	cozyroc_ssis_suite bit NULL,
	cloudhub bit NULL,
	elastic_observability bit NULL,
	exalate bit NULL,
	incydr bit NULL,
	nexpose bit NULL,
	other_available_integrations bit NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Integrat__B403D887667489A9 PRIMARY KEY (integration_id),
	CONSTRAINT FK__Integrati__tool___44FF419A FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.pricing_details definition

-- Drop table

-- DROP TABLE ITSM.dbo.pricing_details;

CREATE TABLE ITSM.dbo.pricing_details (
	pricing_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	pricing_tiers varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	free_version_availability bit NULL,
	free_trial_availability bit NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__PricingD__A25A9FB7EC54F4D2 PRIMARY KEY (pricing_id),
	CONSTRAINT FK__PricingDe__tool___4AB81AF0 FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.ratings definition

-- Drop table

-- DROP TABLE ITSM.dbo.ratings;

CREATE TABLE ITSM.dbo.ratings (
	rating_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	total_reviews int NULL,
	ease_of_use decimal(2,1) NULL,
	features decimal(2,1) NULL,
	design decimal(2,1) NULL,
	support decimal(2,1) NULL,
	overall decimal(2,1) NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Ratings__D35B278B33180479 PRIMARY KEY (rating_id),
	CONSTRAINT FK__Ratings__tool_id__3F466844 FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.training_platforms definition

-- Drop table

-- DROP TABLE ITSM.dbo.training_platforms;

CREATE TABLE ITSM.dbo.training_platforms (
	training_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	documentation bit NULL,
	webinars bit NULL,
	live_online_sessions bit NULL,
	in_person_training bit NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__Training__2F28D08FFB8FD8CC PRIMARY KEY (training_id),
	CONSTRAINT FK__TrainingP__tool___5BE2A6F2 FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);


-- ITSM.dbo.vendor_details definition

-- Drop table

-- DROP TABLE ITSM.dbo.vendor_details;

CREATE TABLE ITSM.dbo.vendor_details (
	vendor_id int IDENTITY(1,1) NOT NULL,
	tool_id int NULL,
	company_name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	year_founded int NULL,
	country varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_at datetime2 DEFAULT getdate() ,
	updated_at datetime2 DEFAULT getdate() ,
	is_deleted bit DEFAULT 0 NULL,
	CONSTRAINT PK__VendorDe__0F7D2B78F22DDE55 PRIMARY KEY (vendor_id),
	CONSTRAINT FK__VendorDet__tool___619B8048 FOREIGN KEY (tool_id) REFERENCES ITSM.dbo.tools(tool_id)
);
