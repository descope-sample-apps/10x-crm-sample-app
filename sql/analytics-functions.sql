-- Function to sum deal values for a tenant
CREATE OR REPLACE FUNCTION sum_deal_values(tenant_id_param TEXT)
RETURNS TABLE(sum DECIMAL) AS $$
BEGIN
  RETURN QUERY
  SELECT COALESCE(SUM(value), 0) as sum
  FROM deals
  WHERE tenant_id = tenant_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get deals grouped by stage
CREATE OR REPLACE FUNCTION get_deals_by_stage(tenant_id_param TEXT)
RETURNS TABLE(
  stage TEXT,
  _count JSON,
  _sum JSON
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.stage,
    json_build_object('id', COUNT(d.id)) as _count,
    json_build_object('value', COALESCE(SUM(d.value), 0)) as _sum
  FROM deals d
  WHERE d.tenant_id = tenant_id_param
  GROUP BY d.stage;
END;
$$ LANGUAGE plpgsql;

