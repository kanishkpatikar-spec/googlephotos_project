CREATE TABLE `candidate_results` (
	`id` text PRIMARY KEY NOT NULL,
	`turn_id` text NOT NULL,
	`asset_id` text,
	`rank` integer,
	`relevance_score` real,
	`was_opened` integer DEFAULT false,
	`was_selected` integer DEFAULT false,
	FOREIGN KEY (`turn_id`) REFERENCES `query_turns`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`asset_id`) REFERENCES `photo_assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `evidence_items` (
	`id` text PRIMARY KEY NOT NULL,
	`source_id` text,
	`raw_statement` text NOT NULL,
	`source_url` text,
	`date` text,
	`is_retrieval_related` integer,
	`target_description` text,
	`asset_type` text,
	`remembered_cues` text,
	`forgotten_info` text,
	`uncertain_info` text,
	`attempted_query` text,
	`system_response` text,
	`failure_point` text,
	`next_action` text,
	`user_succeeded` integer,
	`workaround` text,
	`user_cost` text,
	`failure_category` text,
	`opportunity_category` text,
	`ai_confidence` real,
	`human_reviewed` integer DEFAULT false,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`source_id`) REFERENCES `evidence_sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `evidence_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`platform` text NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`type` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `failure_modes` (
	`id` text PRIMARY KEY NOT NULL,
	`evidence_id` text NOT NULL,
	`failure_stage` text NOT NULL,
	`description` text,
	`confidence` real,
	FOREIGN KEY (`evidence_id`) REFERENCES `evidence_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `interview_observations` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_id` text NOT NULL,
	`observation_text` text NOT NULL,
	`category` text,
	`label` text DEFAULT 'OBSERVATION' NOT NULL,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `interview_quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_id` text NOT NULL,
	`quote_text` text NOT NULL,
	`context` text,
	`theme` text,
	`label` text DEFAULT 'DIRECT_QUOTE' NOT NULL,
	FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `interviews` (
	`id` text PRIMARY KEY NOT NULL,
	`participant_id` text NOT NULL,
	`date` text,
	`transcript` text,
	`notes` text,
	`retrieval_incident` text,
	`target_asset` text,
	`initial_memory` text,
	`query_sequence` text,
	`observed_behavior` text,
	`workaround` text,
	`outcome` text,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `memory_cues` (
	`id` text PRIMARY KEY NOT NULL,
	`evidence_id` text NOT NULL,
	`cue_type` text NOT NULL,
	`cue_value` text NOT NULL,
	`confidence` real,
	FOREIGN KEY (`evidence_id`) REFERENCES `evidence_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `metric_definitions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`type` text,
	`description` text,
	`formula` text,
	`is_primary` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `metric_events` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text,
	`test_session_id` text,
	`event_type` text NOT NULL,
	`event_data` text,
	`interaction_number` integer,
	`result_rank` integer,
	`latency_ms` integer,
	`timestamp` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `retrieval_sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`test_session_id`) REFERENCES `test_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `metric_tree_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_id` text,
	`label` text NOT NULL,
	`description` text,
	`metric_id` text,
	`sort_order` integer DEFAULT 0,
	`is_expanded` integer DEFAULT true,
	`is_validated` integer DEFAULT false,
	FOREIGN KEY (`metric_id`) REFERENCES `metric_definitions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `opportunities` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`evidence_summary` text,
	`evidence_count` integer DEFAULT 0,
	`confidence_score` real,
	`status` text DEFAULT 'identified',
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `opportunity_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`opportunity_id` text NOT NULL,
	`evidence_id` text NOT NULL,
	FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`evidence_id`) REFERENCES `evidence_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` text PRIMARY KEY NOT NULL,
	`alias` text NOT NULL,
	`segment` text,
	`demographics` text,
	`recruiting_criteria` text,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `photo_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`filepath` text NOT NULL,
	`mime_type` text,
	`file_size` integer,
	`category` text,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `photo_embeddings` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`embedding_model` text NOT NULL,
	`embedding_vector` text,
	`embedding_type` text,
	FOREIGN KEY (`asset_id`) REFERENCES `photo_assets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `photo_metadata` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`exif_date` text,
	`latitude` real,
	`longitude` real,
	`location_name` text,
	`ocr_text` text,
	`semantic_caption` text,
	`detected_objects` text,
	`scene_classification` text,
	`document_category` text,
	FOREIGN KEY (`asset_id`) REFERENCES `photo_assets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `query_turns` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`turn_number` integer NOT NULL,
	`raw_query` text,
	`extracted_clues` text,
	`query_representation` text,
	`results_count` integer,
	`target_rank` integer,
	`ai_response` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `retrieval_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `research_findings` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`finding_type` text,
	`confidence` text,
	`label` text DEFAULT 'OBSERVATION' NOT NULL,
	`supporting_evidence` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `retrieval_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text,
	`participant_id` text,
	`session_type` text,
	`started_at` text NOT NULL,
	`ended_at` text,
	`is_success` integer,
	`time_to_target_ms` integer,
	`total_interactions` integer,
	`user_comments` text,
	`researcher_observations` text,
	FOREIGN KEY (`task_id`) REFERENCES `retrieval_tasks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `retrieval_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`target_asset_id` text,
	`memory_cues` text,
	`difficulty` text,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	FOREIGN KEY (`target_asset_id`) REFERENCES `photo_assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `risks` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`severity` text,
	`likelihood` text,
	`mitigation` text,
	`status` text DEFAULT 'identified',
	`related_opportunity_id` text,
	FOREIGN KEY (`related_opportunity_id`) REFERENCES `opportunities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`participant_id` text,
	`session_type` text,
	`started_at` text NOT NULL,
	`completed_at` text,
	`data_mode` text DEFAULT 'demo' NOT NULL,
	FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text,
	`question` text NOT NULL,
	`answer` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `retrieval_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
