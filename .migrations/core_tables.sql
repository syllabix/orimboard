-- Create the Kafka Source
    CREATE SOURCE IF NOT EXISTS widget_topic
    FROM KAFKA BROKER 'broker:29092' TOPIC 'widgets'
    WITH (kafka_time_offset = 0)
    FORMAT BYTES
    ENVELOPE UPSERT;

    CREATE SOURCE IF NOT EXISTS chat_topic
    FROM KAFKA BROKER 'broker:29092' TOPIC 'chats'
    WITH (kafka_time_offset = 0)
    FORMAT BYTES
    ENVELOPE UPSERT;

    CREATE SOURCE IF NOT EXISTS drawn_line_topic
    FROM KAFKA BROKER 'broker:29092' TOPIC 'drawn_lines'
    WITH (kafka_time_offset = 0)
    FORMAT BYTES
    ENVELOPE UPSERT;

    CREATE MATERIALIZED VIEW IF NOT EXISTS widgets AS
    SELECT
        CAST(widget->'id' as TEXT) as id,
        CAST(widget->'fill' as TEXT) as fill,
        CAST(widget->'height' as INT) as height,
        CAST(widget->'width' as INT) as width,
        CAST(widget->'userId' as INT) as user_id,
        CAST(widget->'x' as INT) as x,
        CAST(widget->'y' as INT) as y,
        CAST(widget->'spaceId' as INT) as space_id,
        CAST(widget->'text' as TEXT) as text,
        CAST(widget->'kind' as TEXT) as kind
    FROM (
        -- Parse data from Kafka
        SELECT
          CAST (data AS jsonb) AS widget
        FROM (
          SELECT convert_from(data, 'utf8') AS data
          FROM widget_topic
        )
    );

    CREATE MATERIALIZED VIEW IF NOT EXISTS chats AS
    SELECT
        CAST(chat->'id' as TEXT) as id,
        CAST(chat->'spaceId' as INT) as space_id,
        CAST(chat->'text' as TEXT) as text,
        CAST(chat->'user'->'id' as INT) as user_id,
        CAST(chat->'sentAt' as TEXT) as sent_at
    FROM (
        -- Parse data from Kafka
        SELECT
          CAST (data AS jsonb) AS chat
        FROM (
          SELECT convert_from(data, 'utf8') AS data
          FROM chat_topic
        )
    );

    CREATE MATERIALIZED VIEW IF NOT EXISTS drawn_lines AS
    SELECT
        CAST(drawn_line->'id' as TEXT) as id,
        CAST(drawn_line->'spaceId' as INT) as space_id,
        CAST(drawn_line->'color' as TEXT) as color,
        CAST(drawn_line->'userId' as INT) as user_id,
        CAST(drawn_line->'action' as TEXT) as action,
        CAST(drawn_line->'points' as TEXT) as points
    FROM (
        -- Parse data from Kafka
        SELECT
          CAST (data AS jsonb) AS drawn_line
        FROM (
          SELECT convert_from(data, 'utf8') AS data
          FROM drawn_line_topic
        )
    );


